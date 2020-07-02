import Head from "next/head";
import HeaderTrackers from "./HeaderTrackers";

const Meta = () => (
  <Head>
    <title>Ouro Payments | Privacy Preserving Payments</title>
    <link rel="icon" href="/favicon.ico" />
    <link
      href="https://fonts.googleapis.com/css2?family=Open+Sans&family=Roboto+Slab:wght@500;700;900&display=swap"
      rel="stylesheet"
    />
    <meta
      name="description"
      content="Privacy Preserving Continuous Payment Streams"
    />
    <meta
      property="og:title"
      content="Ouro Payments | Privacy Preserving Payments"
    />
    <meta
      property="og:description"
      content="Privacy Preserving Continuous Payment Streams"
    />
    <meta property="og:image" content="/assets/logo.png" />
    <meta property="og:url" content="https://ouropayments.com" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta
      property="og:site_name"
      content="Ouro Payments | Privacy Preserving Payments"
    />
    <meta
      name="twitter:image:alt"
      content="Ouro Payments | Privacy Preserving Payments"
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </Head>
);

export default Meta;
