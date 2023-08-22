import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import reportWebVitals from "./reportWebVitals";

import App from "./App";
import { Provider } from "react-redux";
import Store from "./store";

function getLibrary(provider) {
  return new Web3Provider(provider);
}
ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <Provider store={Store}>
      <App />
    </Provider>
  </Web3ReactProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
