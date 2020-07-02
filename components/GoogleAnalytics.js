import ReactGA from "react-ga";

export const initGA = () => {
  ReactGA.initialize("UA-139348292-5");
};

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};
