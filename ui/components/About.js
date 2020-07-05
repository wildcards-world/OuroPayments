const About = () => {
  return (
    <div id="about">
      <p>
        Ouro Payments is a privacy preserving payment stream service built on{" "}
        <a href="https://raiden.network/">Raiden Network</a> developed during
        the{" "}
        <a href=" https://gitcoin.co/hackathon/privacy/townsquare/?tab=hackathon:15">
          Gitcoin Protect Privacy hackathon
        </a>{" "}
        fulfilling the bounty{" "}
        <a href="  https://gitcoin.co/issue/raiden-network/hackathons/7/4448">
          Use Raiden for fast privacy preserving payments.
        </a>
      </p>
      <p>
        This website is intended as a demo, to ensure maximum privacy we
        recommend self hosting the application and configuring the dapp to
        connect to your raiden node. Follow the instructions on{" "}
        <a href="https://github.com/wildcards-world/OuroPayments/">
          Github{" "}
          <img
            src="/assets/github.svg"
            style={{ height: "18px", transform: "translateY(3px)" }}
          />
        </a>{" "}
        to self host. Please direct any queries or questions to{" "}
        <a href="https://twitter.com/DenhamPreen">
          @denhampreen{" "}
          <img
            src="/assets/twitter.svg"
            style={{ height: "18px", transform: "translateY(3px)" }}
          />
        </a>
      </p>
      <style jsx>
        {`
          #about {
            width: 100%;
            margin: auto;
            padding: 10px;
            font-size: 18px;
          }
        `}
      </style>
    </div>
  );
};

export default About;
