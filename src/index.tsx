/* eslint-disable */
import "babel-polyfill";
import * as React from "react";
// import * as ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import RedUIStore from "./rogersframework/Store/Store";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";

const store = RedUIStore({});
const configSet = process.env.REACT_APP_LOGIN_CONFIG;
const root = createRoot(document.getElementById("root"));
if (configSet === "LOCAL") {
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  registerServiceWorker();
} else {
  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
  registerServiceWorker();
}
