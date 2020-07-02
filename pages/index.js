import react, { useEffect, useState } from "react";
import { initGA, logPageView } from "../components/GoogleAnalytics";
import Meta from "../components/Meta";
import About from "../components/About";
import { CSSTransition } from "react-transition-group";

import "../css/styles.css";

const Home = () => {
  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  });

  const [about, showAbout] = useState(false);
  const [overview, showOverview] = useState(false);

  return (
    <div className="container">
      <Meta />
      <div className="corner">
        <div className="beta-flag">BETA</div>
      </div>

      <main className="content">
        <div style={{ width: "600px" }} />
        <img
          src="/assets/logo.png"
          style={{ height: about ? "140px" : "190px" }}
        />
        <div>
          <div
            style={{ position: "relative", height: about ? "100px" : "150px" }}
          >
            <CSSTransition
              in={!about}
              timeout={3000}
              classNames="about"
              unmountOnExit
              appear={true}
            >
              <div className="absolute-pos">
                <h1>Ouro Payments</h1>
                <h4>Privacy preserving continuous payment streams</h4>
              </div>
            </CSSTransition>
            <CSSTransition
              in={about}
              timeout={3000}
              classNames="about"
              unmountOnExit
              appear={true}
            >
              <div className="absolute-pos">
                <About />
              </div>
            </CSSTransition>
          </div>
        </div>
      </main>
      <div
        style={{
          display: "flex",
          flexFlow: "row nowrap",
          marginTop: about ? "80px" : "30px",
        }}
      >
        <div onClick={() => showAbout(!about)} className="button">
          <div
            style={{
              margin: "auto",
              padding: "10%",
              color: "white",
              textAlign: "center",
              transform: "translateY(2px)",
            }}
          >
            {about ? "HOME" : "ABOUT"}
          </div>
        </div>
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
            DAPP
          </div>
        </div>
      </div>

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
        .corner {
          position: absolute;
          font-family: "Roboto Slab", serif;
          color: white;
          left: 0px;
          top: 0px;
        }
        .beta-flag {
          transform: rotate(-45deg);
          padding: 20px 12px;
          margin: 0;
        }
        .content {
          color: white;
          text-align: center;
        }
        .content img {
          transition: height 1s linear 0s;
          margin: auto;
        }
        .content h1 {
          font-family: "Roboto Slab", serif;
          font-weight: 500;
          font-size: 70px;
          margin: 10px;
        }
        .content h4 {
          font-family: "Open Sans", sans-serif;
          font-size: 26px;
          font-weight: 200;
          margin: 6px;
        }
        .absolute-pos {
          position: absolute;
          width: 100%;
          top: 0;
          left: 0;
        }
        .button {
          font-weight: bold;
          height: 40px;
          width: 100px;
          margin: 10px;
          font-size: 12px;
          background-image: url("/assets/button-background.png");
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
        }
        .button:hover {
          opacity: 0.7;
          cursor: pointer;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          background: #222;
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }

        a:link {
          color: #e2cba4;
          text-decoration: none;
        }

        a:visited {
          color: #e2cba4;
          text-decoration: none;
        }

        a:hover {
          color: #dbdbdb;
          text-decoration: underline;
        }

        a:active {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};
export default Home;
