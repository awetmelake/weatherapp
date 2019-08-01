import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { fetchCurrent, fetchWeekly } from "../actions/weatherActions";
import Currentforecast from "./Currentforecast";
import Weeklyforecast from "./Weeklyforecast";

//Main component, contains access to redux store and converting functons. state is passed as props to child components
class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      metric: false
    };
  }
  componentWillMount() {
    this.props.fetchCurrent();
    this.props.fetchWeekly();
  }

  toggleMetric = () => {
    this.setState({
      metric: !this.state.metric
    });
  };

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
    return date > 12 ? `${(date -= 12)} pm` : `${(date = date)} am`;
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
        <Currentforecast
          windKph={this.windKph}
          windMph={this.windMph}
          f={this.f}
          c={this.c}
          current={this.getCurrent()}
          getDay={this.getDay}
          getTime={this.getTime}
          metric={this.state.metric}
          toggleMetric={this.toggleMetric}
        />
        <Weeklyforecast
          getTime={this.getTime}
          getDay={this.getDay}
          f={this.f}
          metric={this.state.metric}
          toggleMetric={this.toggleMetric}
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
  { fetchCurrent, fetchWeekly }
)(Weather);
