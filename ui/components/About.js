const About = () => {
  return (
    <div id="about">
      Ouro Payments is a privacy preserving payment stream service built on{" "}
      <a href="https://raiden.network/">Raiden Network</a> developed during the{" "}
      <a href=" https://gitcoin.co/hackathon/privacy/townsquare/?tab=hackathon:15">
        Gitcoin Protect Privacy hackathon
      </a>{" "}
      fulfilling the bounty{" "}
      <a href="  https://gitcoin.co/issue/raiden-network/hackathons/7/4448">
        Use Raiden for fast privacy preserving payments.
      </a>
      <style jsx>
        {`
          #about {
            width: 100%;
            margin: auto;
            padding: 10px;
            font-size: 20px;
          }
        `}
      </style>
    </div>
  );
};

export default About;
