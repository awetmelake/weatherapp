import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCurrent, addLocation } from "../actions/weatherActions";
import PropTypes from 'prop-types';
import Dailyforecast from './Dailyforecast'
class Localweather extends Component {
  componentWillMount() {
    //fetches weather based on location from browser navigator object on load
    this.props.fetchCurrent();
  }

  handleChange = e => {
    this.setState({
      zipCode: e.target.value
    });
  };

  handleClick = e => {
  };

  render() {
    const { local } = this.props;
    const tempF = Math.floor(
      (9 / 5) * ((local.main && local.main.temp) - 273) + 32
    );
    return (
      <div>
        <h2>{local.name}</h2>
        <p>
          {(local.weather && local.weather[0].main) +
            " - " +
            (local.weather && local.weather[0] && local.weather[0].description)}
        </p>
        <h1>{local.main && tempF}</h1>
        <Dailyforecast/>
      </div>
    );
  }
}

Localweather.propTypes = {
  local: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  local: state.weather.local
});

export default connect(
  mapStateToProps,
  { fetchCurrent, addLocation }
)(Localweather);
