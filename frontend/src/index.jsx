import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

ReactDOM.render(
  // <AuthProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  // </AuthProvider>,
  document.getElementById("root")
);
