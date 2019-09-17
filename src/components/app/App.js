import React from "react";
import { connect } from "react-redux";

// styles
import "./App.css";

import Weather from "../Weather.js";

// actions
import { fetchCurrent, fetchWeekly } from "../../actions/weatherActions";
import { fetchUserLocation, setUserZip } from "../../actions/locationActions";


class App extends React.Component {
  render () {
    return (
      <div className="App">
        <Weather />
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
};


export default connect(
  null,
  { fetchCurrent, fetchWeekly, fetchUserLocation, setUserZip }
)(App);
