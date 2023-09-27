import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./bootstrap.min.css";
import store from "./store";
import { Provider } from "react-redux";
import { MathJaxContext } from "better-react-mathjax";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MathJaxContext>
      <Provider store={store}>
        <App />
      </Provider>
    </MathJaxContext>
  </React.StrictMode>
);
