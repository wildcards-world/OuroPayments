import react, { useEffect } from "react";
import { initGA, logPageView } from "../../components/GoogleAnalytics";
import Meta from "../components/Meta";

const Home = () => {
  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  });
  return (
    <div className="container">
      <Meta />

      <main className="content">
        <img src="/assets/logo.png" />
        <h1>Ouro Payments</h1>
        <h4>Privacy preserving continuous payment streams</h4>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-image: url("/assets/background.jpg");
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
        }
        .content {
          color: white;
          text-align: center;
        }
        .content img {
          width: 80%;
          transition: width 2s linear 1s;
          margin: auto;
        }
        .content h1 {
          font-family: "Roboto Slab", serif;
          font-weight: 900;
        }
        .content h4 {
          // font-family: "Open Sans", sans-serif;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};
export default Home;
