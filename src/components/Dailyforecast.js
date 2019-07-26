import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCurrent, addLocation } from "../actions/weatherActions";
import PropTypes from "prop-types";

class Dailyforecast extends Component {
  render() {
    return <div></div>;
  }
}

const mapStateToProps = state => ({
  local: state.weather.local
});

export default connect(
  mapStateToProps,
  { fetchCurrent, addLocation }
)(Dailyforecast);
