import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import moment from "moment";
import {
  useTable,
  usePagination,
  useSortBy,
  useFilters,
  useGroupBy,
  useExpanded,
  useRowSelect,
} from "react-table";
import StreamContext from "../context/stream/streamContext";

import Modal from "react-modal";

import {
  DefaultColumnFilter,
  SelectColumnFilter,
  NumberRangeColumnFilter,
  fuzzyTextFilterFn,
} from "./table-utils/table-filters";

import makeData from "./table-utils/make-data";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "600px",
    padding: 0,
    zIndex: 20,
  },
};

const Styles = styled.div`
  padding: 1rem 0rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      font-size: 12px;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }

    td {
      input {
        font-size: 1rem;
        padding: 0;
        margin: 0;
        border: 0;
      }
    }
  }

  button {
    cursor: pointer;
  }

  button:onhover {
    background-color: #fff;
  }

  .pagination {
    padding: 0.5rem;
  }
`;

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

function Table({ columns, data }) {
  const streamContext = useContext(StreamContext);
  const { deleteStream } = streamContext;

  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: {
      pageIndex,
      pageSize,
      sortBy,
      groupBy,
      expanded,
      filters,
      selectedRowIds,
    },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
      disableMultiSort: true,
    },
    useFilters,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
    // Here we will use a plugin to add our selection column
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: "selection",
            // Make this column a groupByBoundary. This ensures that groupBy columns
            // are placed after it
            groupByBoundary: true,
            // The header can use the table's getToggleAllRowsSelectedProps method
            // to render a checkbox
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <div>
                {/* <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} /> */}
              </div>
            ),
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell: ({ row }) => (
              <div>
                {/* <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} /> */}
              </div>
            ),
          },
          ...columns,
        ];
      });
    }
  );

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [activeCell, setActiveCell] = React.useState(null);

  function closeModal() {
    setIsOpen(false);
    setActiveCell(null);
  }

  function openModal(cell) {
    setActiveCell(cell);
    setIsOpen(true);
  }

  // Render the UI for your table
  return (
    <div className="normal-text charcoal">
      <br />
      <table {...getTableProps()} className="white-bg">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <>
                  <th {...column.getHeaderProps()}>
                    <div>
                      <span {...column.getSortByToggleProps()}>
                        {column.render("Header")}
                        {/* Add a sort direction indicator */}
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                          : ""}
                      </span>
                    </div>
                    {/* Render the columns filter UI */}
                    <div>
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
                  </th>
                </>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            // console.log(row);
            prepareRow(row);
            return (
              <>
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    // console.log("cell");
                    // console.log(cell);
                    // moment().format('MMMM Do YYYY, h:mm:ss a')

                    return (
                      <>
                        {cell.column.Header === "Date" ? (
                          <td {...cell.getCellProps()}>
                            {moment(cell.value).format("MMM Do YY, h:mm:ss")}
                          </td>
                        ) : cell.column.Header === "Actions" ? (
                          <td {...cell.getCellProps()}>
                            <button onClick={() => openModal(cell.value)}>
                              Delete
                            </button>{" "}
                          </td>
                        ) : (
                          <td {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        )}
                      </>
                    );
                  })}
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      {/* For debugging */}
      {/* <pre>
        <code>
          {JSON.stringify(
            {
              pageIndex,
              pageSize,
              pageCount,
              canNextPage,
              canPreviousPage,
              sortBy,
              groupBy,
              expanded: expanded,
              filters,
              selectedRowIds: selectedRowIds,
            },
            null,
            2
          )}
        </code>
      </pre> */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel=""
        // className="redirect-notice-modal"
      >
        <div style={{ padding: "3rem" }}>
          <h3 style={{ padding: "0" }} className="section-title">
            Are you sure?
          </h3>
          <div
            style={{
              display: "flex",
              flexFlow: "row nowrap",
              justifyContent: "space-between",
            }}
          >
            <button
              onClick={() => closeModal()}
              style={{ padding: "1rem", width: "30%" }}
              className="charcoal-bg stone normal-text"
            >
              Cancel Action
            </button>
            <button
              onClick={() => {
                deleteStream(id);
                closeModal();
              }}
              style={{ padding: "1rem", width: "30%" }}
              className="dark-green-bg white normal-text"
            >
              End stream
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    );
  }
);

const StreamsTable = () => {
  const streamContext = useContext(StreamContext);
  const { getStreams, streams } = streamContext;

  // const [data, setData] = React.useState(() => makeData(15));
  // const [originalData] = React.useState(data);

  useEffect(() => {
    getStreams();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Streams",
        columns: [
          {
            Header: "Receiver Address",
            accessor: "recipient",
          },
          {
            Header: "Interval",
            accessor: "interval",
            Filter: SelectColumnFilter,
            filter: "includes",
          },
          {
            Header: "Length",
            accessor: "lengthOfPayment",
            Filter: SelectColumnFilter,
            filter: "includes",
          },
          {
            Header: "Amount",
            accessor: "deposit",
            Filter: NumberRangeColumnFilter,
            filter: "between",
          },
          {
            Header: "Amount Streamed",
            accessor: "numerOfPaymentsMade",
            Filter: NumberRangeColumnFilter,
            filter: "between",
          },
          {
            Header: "Actions",
            accessor: "_id",
          },
        ],
      },
    ],
    []
  );

  return streams.length > 0 ? (
    <Styles>
      <Table columns={columns} data={streams} />
      {/* <Table columns={columns} data={originalData} /> */}
    </Styles>
  ) : (
    <p>No streams found</p>
  );
};

export default StreamsTable;
