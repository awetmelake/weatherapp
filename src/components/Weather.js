import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { fetchCurrent, fetchWeekly } from "../actions/weatherActions";
import Currentforecast from "./Currentforecast";
import Weeklyforecast from "./Weeklyforecast";

class Weather extends Component {
  componentWillMount() {
    this.props.fetchCurrent();
    this.props.fetchWeekly();
  }

  //convert kalvin to fahrenheight
  f = temp => Math.floor(((temp - 273.15) * 9) / 5 + 32);

  convertSpeed = speed => Math.floor(speed * 2.23694);

  getDay = () => {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let date = new Date();
    return days[date.getDay()];
  };

  render() {
    return (
      <div>
        <Currentforecast
          convertSpeed={this.convertSpeed}
          f={this.f}
          current={this.props.current}
          getDay={this.getDay}
        />
        <Weeklyforecast f={this.f} />
      </div>
    );
  }
}

Weather.propTypes = {
  current: PropTypes.object.isRequired,
  weekly: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  current: state.weather.current,
  weekly: state.weather.weekly
});

export default connect(
  mapStateToProps,
  { fetchCurrent, fetchWeekly }
)(Weather);
