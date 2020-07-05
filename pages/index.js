import react, { useEffect, useState } from "react";
import Link from "next/link";
import { initGA, logPageView } from "../components/GoogleAnalytics";
import Meta from "../components/Meta";
import About from "../components/About";
import Typist from "react-typist";
import TypistLoop from "react-typist-loop";
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
    <div>
      <Meta />

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
                <Typist
                  avgTypingDelay={80}
                  startDelay={1000}
                  cursor={{ hideWhenDone: true }}
                >
                  <h4>
                    Use Ouro for salary payments{" "}
                    <Typist.Backspace count={16} delay={1000} />
                    car rental payments
                  </h4>
                </Typist>
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
          justifyContent: "center",
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
              transform: "translateY(5px)",
            }}
          >
            {about ? "HOME" : "ABOUT"}
          </div>
        </div>
        <Link href="/dapp">
          <div className="button">
            <div
              style={{
                margin: "auto",
                padding: "10%",
                color: "white",
                textAlign: "center",
                transform: "translateY(5px)",
              }}
            >
              DAPP
            </div>
          </div>
        </Link>
      </div>

      <style jsx>{`
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
               }
      `}</style>
    </div>
  );
};
export default Home;
