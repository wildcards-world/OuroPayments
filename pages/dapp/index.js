import Link from "next/link";

const Overview = () => {
  return (
    <div className="step-container">
      <Link href="/">
        <a style={{ margin: "auto", textAlign: "center", display: "block" }}>
          <img src="/assets/logo.png" style={{ height: "100px" }} />
        </a>
      </Link>
      <div style={{ margin: "2rem 0" }}>
        <h4>⚡&emsp;Step 1 </h4>
        <p>&emsp;&emsp;Create a channel</p>
        <h4>⚡&emsp;Step 2 </h4>
        <p>&emsp;&emsp;Initiate payment stream</p>
        <h4>⚡&emsp;Step 3 </h4>
        <p>&emsp;&emsp;Track stream</p>
      </div>
      <div style={{ margin: "auto" }}>
        <Link href="/dapp/create-channel">
          <div className="button" style={{ margin: "auto" }}>
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
      <style jsx>{`
        p {
          font-weight: lighter;
        }
      `}</style>
    </div>
  );
};

export default Overview;
