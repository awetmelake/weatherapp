import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { fetchCurrent, fetchWeekly } from "../actions/weatherActions";

import Currentforecast from "./Currentforecast";
import Weeklyforecast from "./Weeklyforecast";

class Weather extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchCurrent();
    this.props.fetchWeekly();
  }

  render() {
    return (
      <div>
        <Currentforecast current={this.props.current} />
        <Weeklyforecast daily={this.props.weekly} />
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
