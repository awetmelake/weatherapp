import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { changeFocus } from "../../actions/weatherActions";
import Weeklyforecastitem from "./Weeklyforecastitem.js";

// Renders future forecast information. Forecast information is displayed for every 3 hours of the upcoming 5 days. Allows for clicking at a specific hour to reveal an indepth display of the forecast at that time.
class Weeklyforecast extends Component {
  render() {
    const { c, f, changeFocus, weekly, current, getTime, metric } = this.props;
    return (
      <div className="weekly">
        <div
          onClick={e => changeFocus(0)}
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
          c={c}
          weekly={weekly}
          metric={metric}
        />
      </div>
    );
  }
}

Weeklyforecast.propTypes = {
  current: PropTypes.object.isRequired,
  weekly: PropTypes.object.isRequired,
  metric: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  current: state.weather.current,
  weekly: state.weather.weekly,
  metric: state.unit.metric
});

export default connect(
  mapStateToProps,
  { changeFocus }
)(Weeklyforecast);
