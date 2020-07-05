function Layout({ Component, pageProps }) {
  return (
    <div className="container">
      <div className="corner">
        <div className="beta-flag">BETA</div>
      </div>
      <Component {...pageProps} />
      <div className="bottom-corner">
        <img src="/assets/raiden-network.svg" />
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
        .bottom-corner {
          position: absolute;
          right: 0px;
          bottom: 0px;
        }
        .bottom-corner img {
          height: 100px;
          padding: 1rem;
        }
        .beta-flag {
          transform: rotate(-45deg);
          padding: 20px 12px;
          margin: 0;
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

        input:focus,
        textarea:focus,
        select:focus {
          outline: none;
        }
        input,
        textarea,
        select {
          border: 1px solid #eeeeee88;
          padding: 10px;
        }

        .button {
          font-weight: bold;
          height: 60px;
          width: 150px;
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
        .step-container {
          color: white;
          background-color: #33333388;
          padding: 3rem;
          width: 440px;
          border: 1px solid #333333cc;
        }
      `}</style>
    </div>
  );
}

export default Layout;
