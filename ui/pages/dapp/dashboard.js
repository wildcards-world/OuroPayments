import Link from "next/link";
import StreamsTable from "../../components/StreamsTable";

const CreateStream = () => {
  return (
    <div className="step-container-dashboard">
      <Link href="/">
        <a style={{ margin: "auto", textAlign: "center", display: "block" }}>
          <img src="/assets/logo.png" style={{ height: "80px" }} />
        </a>
      </Link>
      <StreamsTable />
      <style jsx>{`
        .step-container-dashboard {
          color: white;
          background-color: #33333388;
          padding: 1rem 3rem;
          border: 1px solid #333333cc;
        }
        p {
          font-weight: lighter;
        }
      `}</style>
    </div>
  );
};

export default CreateStream;
