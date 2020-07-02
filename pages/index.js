import Head from "next/head";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Ouro Payments | Privacy Preserving Payments</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <img src="/assets/logo.png" />
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
}
