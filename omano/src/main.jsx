
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { StateProvider } from "./context/StateProvider.jsx";
import { initialState } from "./context/initialState.js";
import reducer from "./context/reducer.js";
import "./index.css";
// dotenv.config();


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StateProvider reducer={reducer} initialState={initialState}>
      <App />
    </StateProvider>
  </React.StrictMode>
);
