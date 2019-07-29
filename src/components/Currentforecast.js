import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCurrent } from "../actions/weatherActions";
import PropTypes from "prop-types";

class Currentforecast extends Component {
  handleChange = e => {
    this.setState({
      zipCode: e.target.value
    });
  };

  handleClick = e => {};

  render() {
    return <div></div>;
  }
}

Currentforecast.propTypes = {};

export default Currentforecast;
