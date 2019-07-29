import React from "react";
import "./App.css";
import { Provider } from "react-redux";

import Weather from "./components/Weather.js";

import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Weather />
      </div>
    </Provider>
  );
}

export default App;
