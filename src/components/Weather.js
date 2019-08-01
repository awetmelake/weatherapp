import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { fetchCurrent, fetchWeekly } from "../actions/weatherActions";
import Currentforecast from "./Currentforecast";
import Weeklyforecast from "./Weeklyforecast";

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
    let date = new Date(this.props.current.dt * 1000);
    return days[date.getDay()];
  };

  getTime = () => {
    let date = new Date(this.props.current.dt * 1000);
    return date.getHours();
  };
  
  render() {
    return (
      <div>
        <Currentforecast
          windKph={this.windKph}
          windMph={this.windMph}
          f={this.f}
          c={this.c}
          current={this.props.current}
          getDay={this.getDay}
          getTime={this.getTime}
          metric={this.state.metric}
          toggleMetric={this.toggleMetric}
        />
        <Weeklyforecast
          getTime={this.getTime}
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
