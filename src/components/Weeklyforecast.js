import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { changeFocus } from "../actions/weatherActions";
import Weeklyforecastitem from "./Weeklyforecastitem.js";
// Renders future forecast information. Forecast information is displayed for every 3 hours of the upcoming 5 days. Allows for clicking at a specific hour to reveal an indepth display of the forecast at that time.
class Weeklyforecast extends Component {
  render() {
    const { f, changeFocus, weekly, current, getTime } = this.props;
    return (
      <div className="weekly">
        <div
          onClick={changeFocus.bind(this, 0)}
          className={`weekly-forecast-item btn`}
        >
          <img
            className="weekly-icon"
            src={`http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}
            alt="weather icon"
            width="40px"
          />

          <p>now</p>
          <p>{f(current.main.temp)}</p>
        </div>

        {/* displays for future forecasts */}
        <Weeklyforecastitem
          getTime={getTime}
          changeFocus={changeFocus}
          f={f}
          weekly={weekly}
        />
      </div>
    );
  }
}

Weeklyforecast.propTypes = {
  current: PropTypes.object.isRequired,
  weekly: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  current: state.weather.current,
  weekly: state.weather.weekly
});

export default connect(
  mapStateToProps,
  { changeFocus }
)(Weeklyforecast);
