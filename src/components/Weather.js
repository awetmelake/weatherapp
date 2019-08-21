import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// TODO: future forecasts projects for any day other than the current should have the day of the week instead of the time displayed on the Weeklyforecastitem component, add functionality based on user inputted location (zip), organize Weeklyforecastitems possibly make it a carousel

import { fetchCurrent, fetchWeekly } from "../actions/weatherActions";
// import { toggleMetric } from "../actions/unitActions";
import { fetchUserLocation } from "../actions/locationActions";
import CurrentForecast from "./current/CurrentForecast";
import Weeklyforecast from "./weekly/Weeklyforecast";

//Main component, contains access to redux store and converting functons. state is passed as props to child components
class Weather extends Component {
  componentDidMount() {
    this.props
      .fetchUserLocation()
      .then(() => {
        this.props.fetchCurrent();
        this.props.fetchWeekly();
      })
      .catch(err => alert(err));
  }

  //convert kalvin to fahrenheight
  f = temp => Math.round(((temp - 273.15) * 9) / 5 + 32);

  //convert kalvin to celcius
  c = temp => Math.round(temp - 273.15);

  //convert wind from m/s to mph
  windMph = speed => Math.round(speed * 2.23694);

  //convert wind from m/s to kph
  windKph = speed => Math.round(speed * 3.6);

  getDay = date => {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    return days[date.getDay()];
  };

  getTime = date => {
    date = date.getHours();
    return date > 12 ? `${(date -= 12)} pm` : `${date} am`;
  };

  //returns the relevant weather object based on the value of focus in the redux store which dictates what forecast the user would like to see
  getCurrent = () => {
    if (this.props.focus === 0) {
      return this.props.current;
    } else {
      return this.props.weekly.list[this.props.focus - 1];
    }
  };

  render() {
    return (
      <div>
        <h1>{this.props.current.name}</h1>
        <CurrentForecast
          windKph={this.windKph}
          windMph={this.windMph}
          f={this.f}
          c={this.c}
          current={this.getCurrent()}
          getDay={this.getDay}
          getTime={this.getTime}
        />
        <Weeklyforecast
          getTime={this.getTime}
          getDay={this.getDay}
          f={this.f}
          c={this.c}
        />
      </div>
    );
  }
}

Weather.propTypes = {
  current: PropTypes.object.isRequired,
  weekly: PropTypes.object.isRequired,
  focus: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  current: state.weather.current,
  weekly: state.weather.weekly,
  focus: state.weather.focus
});

export default connect(
  mapStateToProps,
  { fetchCurrent, fetchWeekly, fetchUserLocation }
)(Weather);
