import * as React from "react";
import { hot } from "react-hot-loader/root";
import "bootstrap/dist/css/bootstrap.min.css";
import { MetaMaskProvider } from "metamask-react";
import App from "./App";

const Launcher = () => (
  <MetaMaskProvider>
    <App />
  </MetaMaskProvider>
);

export default hot(Launcher);
