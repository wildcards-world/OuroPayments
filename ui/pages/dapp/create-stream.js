import Link from "next/link";
import CreateStreamForm from "../../components/CreateStreamForm";

const CreateStream = () => {
  return (
    <div className="step-container">
      <Link href="/">
        <a style={{ margin: "auto", textAlign: "center", display: "block" }}>
          <img src="/assets/logo.png" style={{ height: "80px" }} />
        </a>
      </Link>
      <CreateStreamForm />
      <style jsx>{`
        p {
          font-weight: lighter;
        }
      `}</style>
    </div>
  );
};

export default CreateStream;
