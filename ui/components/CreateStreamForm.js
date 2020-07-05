import React, { useState } from "react";
import Link from "next/link";

const CreateStreamForm = () => {
  const [address, setAddress] = useState("");
  const [token, setToken] = useState("");
  const [streamLength, setStreamLength] = useState("");
  const [streamInterval, setStreamInterval] = useState("");
  const [amount, setAmount] = useState(10);

  const [status, setStatus] = useState({
    message: "",
    color: "",
  });

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
  };

  return (
    <React.Fragment>
      <div style={{ margin: "2rem 0" }} className="stream-form">
        <h2>Create Stream </h2>
        <label for="address">Recipient Address</label>
        <input
          id="address"
          placeholder="Eg. 0xAb5801a7D...05C5B3259aeC9B"
          type="text"
          value={address}
          onChange={(event) => {
            setAddress(event.target.value);
            clearMessage();
          }}
        />
        <label for="token">Token</label>
        <select id="token">
          <option>OuroDAI</option>
        </select>
        <label for="stream-length">Stream Length</label>
        <select id="stream-length">
          <option val="1">1 day</option>
          <option val="14">14 days</option>
          <option val="30">30 days</option>
          <option val="-1">Continuous</option>
        </select>
        <label for="stream-interval">Payment interval</label>
        <select id="stream-interval">
          <option val="1">Each Minute</option>
          <option val="60">Hourly</option>
          <option val="1440">Daily</option>
        </select>
        <input
          placeholder="Amount"
          type="number"
          value={amount}
          onChange={(event) => {
            setAmount(event.target.value);
            clearMessage();
          }}
        />
        <div style={{ margin: "auto" }}>
          <Link href="/dapp/create-stream">
            <div className="button" style={{ margin: "auto" }}>
              <div
                style={{
                  margin: "auto",
                  padding: "10%",
                  color: "white",
                  textAlign: "center",
                  transform: "translateY(5px)",
                }}
              >
                CREATE STREAM
              </div>
            </div>
          </Link>
        </div>
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
