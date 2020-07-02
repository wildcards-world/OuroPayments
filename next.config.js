const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require("next/constants");

const withCSS = require("@zeit/next-css");

module.exports = (phase) => {
  // when started in development mode `next dev` or `npm run dev`
  const ISDEVELOPMENT = phase === PHASE_DEVELOPMENT_SERVER;
  // when `next build` or `npm run build` is used
  const ISPRODUCTION = phase === PHASE_PRODUCTION_BUILD;

  const env = {
    ISDEVELOPMENT,
    ISPRODUCTION,
  };

  return withCSS({
    env,
  });
};
