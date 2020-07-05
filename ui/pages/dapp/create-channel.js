import Link from "next/link";

const CreateChannel = () => {
  return (
    <div className="step-container">
      <Link href="/">
        <a style={{ margin: "auto", textAlign: "center", display: "block" }}>
          <img src="/assets/logo.png" style={{ height: "80px" }} />
        </a>
      </Link>
      <div style={{ margin: "2rem 0" }} className="stream-form">
        <h2>Create Stream </h2>
        <label for="address">Recipient Address</label>
        <input id="address" placeholder="Eg. 0xAb5801a7D...05C5B3259aeC9B" />
        <label for="token">Token</label>
        <select id="token">
          <option>OuroDAI</option>
        </select>
        <label for="stream-length">Stream Length</label>
        <select id="stream-length">
          <option val="1">1 day</option>
          <option val="14">14 days</option>
          <option val="30">30 days</option>
        </select>
        <label for="stream-interval">Payment interval</label>
        <select id="stream-interval">
          <option val="1">Each Minute</option>
          <option val="60">Hourly</option>
          <option val="1440">Daily</option>
        </select>
        <input placeholder="Deposit" />
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
    </div>
  );
};

export default CreateChannel;
