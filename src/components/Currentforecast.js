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
    const {
      windKph,
      windMph,
      f,
      current,
      getDay,
      getTime,
      c,
      toggleMetric,
      metric
    } = this.props;

    const { name, weather, main, wind } = current;
    return (
      <div className="current">
        <div id="current-weather-one">
          <h1>{name}</h1>
          <h4>{getDay()}</h4>
          <h4>{getTime()}</h4>
          <h4>{weather[0].description}</h4>
        </div>

        <div className="current-main">
          <img
            className="current-icon"
            src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
            alt="weather icon"
          />

          {/*toggle metric/imperial for temperature*/}
          {metric ? (
            <div onClick={toggleMetric.bind(this)} className="current-temp btn">
              {c(main.temp)}° C
            </div>
          ) : (
            <div onClick={toggleMetric.bind(this)} className="current-temp btn">
              {f(main.temp)}° F
            </div>
          )}
        </div>

        <div id="current-weather-two">
          <div>Humidity: {main.humidity}%</div>

          {/*toggle metric/imperial for wind*/}
          {metric ? (
            <div>Wind: {windKph(wind.speed)} kph</div>
          ) : (
            <div>Wind: {windMph(wind.speed)} mph</div>
          )}
        </div>
      </div>
    );
  }
}

Currentforecast.propTypes = {
  current: PropTypes.object.isRequired
};

export default Currentforecast;
