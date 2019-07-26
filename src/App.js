import React from "react";
import "./App.css";
import { Provider } from "react-redux";

import Localweather from "./components/Localweather.js";

import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Localweather />
      </div>
    </Provider>
  );
}

export default App;
