import React, { Component } from "react";
import PropTypes from "prop-types";

//Renders current forecast retreived from api, or the predicted forecast of the time the user selected if the value of state.focus is not 0. It is 0 by default
class Currentforecast extends Component {
  handleChange = e => {
    this.setState({
      zipCode: e.target.value
    });
  };

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
    const { weather, main, wind, clouds } = current;
    let date = new Date(current.dt * 1000);

    return (
      <div className="current">
        <div className="current-weather-one">
          <h4>{getDay(date)}</h4>
          <h4>{getTime(date)}</h4>
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

        <div className="current-weather-two">
          <div>Cloudiness: {clouds.all}%</div>
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
