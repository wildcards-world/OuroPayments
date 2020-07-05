import Link from "next/link";

const CreateChannel = () => {
  return (
    <div>
      <Link href="/">
        <img src="/assets/logo.png" style={{ height: "100px" }} />
      </Link>
      <h4>Create Channel</h4>

      <Link href="/dapp/create-stream">
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
            CREATE STREAM
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CreateChannel;
