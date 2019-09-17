import React from "react";
import { connect } from "react-redux";

// styles
import "./App.css";

import Weather from "../Weather.js";

// actions
import { fetchCurrent, fetchWeekly } from "../../actions/weatherActions";
import { fetchUserLocation, setUserZip } from "../../actions/locationActions";

class App extends React.Component {
  render() {
    return (
      <div>
        <div className="App">
          <Weather />
        </div>
        <footer>
          <p style={{ position: "absolute", bottom: "0", left: "20px" }}>
            <a href="https://openweathermap.org/api">
              Powered by Open Weather Map API
            </a>
            {" | "}
            <a href="https://github.com/awetmelake/weatherapp">REPO</a>
            <br />
            Made by Awet Melake
          </p>
        </footer>
      </div>
    );
  }

  componentDidMount() {
    this.props
      .fetchUserLocation()
      .then(() => {
        this.props.fetchCurrent();
        this.props.fetchWeekly();
      })
      .catch(err => console.log(err));
  }
}

export default connect(
  null,
  { fetchCurrent, fetchWeekly, fetchUserLocation, setUserZip }
)(App);
