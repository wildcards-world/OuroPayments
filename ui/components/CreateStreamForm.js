import React, { useState, useContext } from "react";
import Link from "next/link";
import WAValidator from "wallet-address-validator";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import axios from "axios";
import StreamContext from "../context/stream/streamContext";

const CreateStreamForm = () => {
  const streamContext = useContext(StreamContext);

  const { addStream } = streamContext;
  const [address, setAddress] = useState("");
  const [token, setToken] = useState(
    "0xef728932707ae91844cff5176ab544a0b7500331"
  );
  const [streamLength, setStreamLength] = useState(14);
  const [streamInterval, setStreamInterval] = useState(60);
  const [amount, setAmount] = useState(10);

  const [status, setStatus] = useState({
    message: "",
    color: "",
  });

  const [submittingLoading, setSubmittingLoading] = useState(null);

  const clearMessage = () => setStatus({ message: "", color: "" });

  const submitStream = () => {
    console.log(address);
    console.log(token);
    console.log(streamLength);
    console.log(streamInterval);
    console.log(amount);
    const validation = true;
    if (validation) {
      if (address === "") {
        setStatus({
          message: "Please input a recieving address",
          color: "red",
        });
        return;
      }
      if (token === "") {
        setStatus({
          message: "Please select a token",
          color: "red",
        });
        return;
      }
      if (streamLength === "") {
        setStatus({
          message: "Please select a stream length",
          color: "red",
        });
        return;
      }
      if (streamInterval === "") {
        setStatus({
          message: "Please select a stream interval",
          color: "red",
        });
        return;
      }
      if (amount == "") {
        setStatus({
          message: "Please input an amount",
          color: "red",
        });
        return;
      }
      clearMessage();
    }
    setSubmittingLoading(true);
    // Request to backend with data

    const dataPack = {
      recipient: address,
      addressTokenStream: token,
      lengthOfPayment: streamLength,
      interval: streamInterval,
      rate: "10",
      // deposit: amount,
      deposit: "100",
    };

    console.log(dataPack);

    addStream(dataPack);

    // axios({
    //   method: "post",
    //   url: "http://localhost:5000/create-stream-test",
    //   data: dataPack,
    // })
    //   .then(function (response) {
    //     console.log(response.data);
    //     console.log(response.status);
    //     console.log(response.statusText);
    //     console.log(response.headers);
    //     console.log(response.config);
    //     setSubmittingLoading(false);
    //   })
    //   .catch(function (error) {
    //     console.log(error.toJSON());
    //     setSubmittingLoading(false);
    //     setStatus({
    //       message: `It seem's we are having issues connecting to the backend: ${error.toString()}`,
    //       color: "red",
    //     });
    //   });
  };

  return (
    <React.Fragment>
      {submittingLoading && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-50%)",
            padding: "1rem",
            backgroundColor: "#454545cc",
            border: "1px solid black",
          }}
        >
          <Loader
            type="BallTriangle"
            color="#efefef"
            height={100}
            width={100}
            visible={true}
            style={{ textAlign: "center" }}
          />
          <p>
            {" "}
            This may take a few minutes
            <br /> as we are interacting with <br /> the ethereum network
          </p>
        </div>
      )}
      <div style={{ margin: "2rem 0" }} className="stream-form">
        <h2>Create Stream </h2>
        <label htmlFor="address">Recipient Address</label>
        <input
          id="address"
          placeholder="Eg. 0xAb5801a7D...05C5B3259aeC9B"
          type="text"
          value={address}
          onChange={(event) => {
            setAddress(event.target.value);
            clearMessage();
          }}
          onBlur={(event) => {
            console.log(event.target.value);
            console.log(WAValidator.validate(event.target.value, "ETH"));
            if (!WAValidator.validate(event.target.value, "ETH")) {
              setStatus({
                message: "Please use a valid eth address address",
                color: "orange",
              });
            }
          }}
        />
        <label htmlFor="token">Token</label>
        <select
          id="token"
          onChange={(event) => {
            setToken(event.target.value);
          }}
        >
          <option value={"0xef728932707ae91844cff5176ab544a0b7500331"}>
            OuroDAI
          </option>
        </select>
        <label htmlFor="stream-length">Stream Length</label>
        <select
          id="stream-length"
          onChange={(event) => {
            setStreamLength(event.target.value);
          }}
        >
          {[
            { value: 1, text: "1 day" },
            { value: 14, text: "14 days" },
            { value: 30, text: "30 days" },
            { value: -1, text: "Continuous" },
          ].map((lengthOption) => (
            <option
              value={lengthOption.value}
              selected={streamLength == lengthOption.value}
            >
              {lengthOption.text}
            </option>
          ))}
        </select>
        <label for="stream-interval">Payment interval</label>
        <select
          id="stream-interval"
          onChange={(event) => {
            setStreamInterval(event.target.value);
          }}
        >
          {[
            { value: 1, text: "Every Minute" },
            { value: 60, text: "Hourly" },
            { value: 1440, text: "Daily" },
          ].map((intervalOption) => (
            <option
              value={intervalOption.value}
              selected={streamInterval == intervalOption.value}
            >
              {intervalOption.text}
            </option>
          ))}
        </select>
        <input
          placeholder="Amount"
          type="number"
          value={amount}
          onChange={(event) => {
            setAmount(event.target.value);
            clearMessage();
          }}
          onBlur={(event) => {
            if (event.target.value > 1000) {
              setStatus({
                message:
                  "Please set the amount to 1000 or less to ensure sufficient test token in the node",
                color: "orange",
              });
            }
          }}
        />
        <div style={{ margin: "auto" }}>
          <div
            className="button"
            style={{ margin: "auto" }}
            onClick={() => submitStream()}
          >
            <div
              style={{
                margin: "auto",
                padding: "10%",
                color: "white",
                textAlign: "center",
                transform: "translateY(7px)",
              }}
            >
              CREATE STREAM
            </div>
          </div>
        </div>
        {!!status.message && (
          <div
            style={{
              color: status.color,
              border: "1px solid " + status.color,
              padding: "1rem",
              marginTop: "1rem",
              width: "100%",
              fontWeight: "bold",
              backgroundColor: "#efefefdd",
            }}
          >
            {status.message}
          </div>
        )}
        <style jsx>{`
          p {
            font-weight: lighter;
          }
          .stream-form input,
          .stream-form select {
            width: 100%;
            margin: 1rem 0;
          }
        `}</style>
      </div>
    </React.Fragment>
  );
};

export default CreateStreamForm;
