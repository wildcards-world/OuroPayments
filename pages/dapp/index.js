import Link from "next/link";

const Overview = () => {
  return (
    <div className="step-container">
      <Link href="/">
        <img src="/assets/logo.png" style={{ height: "100px" }} />
      </Link>
      <h4>Step 1 </h4>
      <p>- Create a channel</p>
      <h4>Step 2 </h4>
      <p>- Initiate payment stream</p>
      <h4>Step 3 </h4>
      <Link href="/dapp/create-channel">
        <div className="button">
          <div
            style={{
              margin: "auto",
              padding: "10%",
              color: "white",
              textAlign: "center",
              transform: "translateY(2px)",
            }}
          >
            GET STARTED
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Overview;
