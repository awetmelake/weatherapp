import React, { Component } from "react";
import PropTypes from "prop-types";

class Currentforecast extends Component {
  handleChange = e => {
    this.setState({
      zipCode: e.target.value
    });
  };

  handleClick = e => {};

  render() {
    const { convertSpeed, f, current, getDay } = this.props;
    const { name, weather, main, wind } = current;
    return (
      <div className="current-forecast">
        <div id="current-weather-one">
          <h1>{name}</h1>
          <h4>{getDay()}</h4>
          <h4>{weather[0].description}</h4>
          <div className="current-main">
            <div className="current-temp">{f(main.temp)}° F</div>
            <img
              className="current-icon"
              src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
              alt="weather icon"
            />
          </div>
        </div>
        <br />
        <div id="current-weather-two">
          <div>Humidity: {main.humidity}%</div>
          <div>Wind: {convertSpeed(wind.speed)} mph</div>
        </div>
      </div>
    );
  }
}

Currentforecast.propTypes = {
  current: PropTypes.object.isRequired
};

export default Currentforecast;
