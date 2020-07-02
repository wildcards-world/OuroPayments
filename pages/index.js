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
      <button onClick={() => showAbout(!about)}>About</button>
      <main className="content">
        <div style={{ width: "500px" }} />
        <img
          src="/assets/logo.png"
          style={{ width: about ? "200px" : "500px" }}
        />
        <div style={{ position: "relative" }}>
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
          transition: width 1s linear 0s;
          margin: auto;
        }
        .content h1 {
          font-family: "Roboto Slab", serif;
          font-weight: 900;
        }
        .content h4 {
          // font-family: "Open Sans", sans-serif;
        }
        .absolute-pos {
          position: absolute;
          width: 100%;
          top: 0;
          left: 0;
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
      `}</style>
    </div>
  );
};
export default Home;
