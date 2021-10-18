import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import "./bootstrap.min.css";
import "./index.css";
import axios from "axios";
import App from "./App";

axios.defaults.baseURL = "https://proshop-ecomerce-app-mern.vercel.app";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
