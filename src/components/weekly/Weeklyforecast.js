import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { changeFocus } from "../../actions/weatherActions";
import Weeklyforecastitem from "./Weeklyforecastitem.js";

// Renders future forecast information. Forecast information is displayed for every 3 hours of the upcoming 5 days. Allows for clicking at a specific hour to reveal an indepth display of the forecast at that time.
class Weeklyforecast extends Component {
  render() {
    const {
      c,
      f,
      changeFocus,
      weekly,
      current,
      getTime,
      metric,
      getDay
    } = this.props;
    return (
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-ride="carousel"
        data-interval="false"
      >
        <div className="carousel-inner">
          {
            <Weeklyforecastitem
              current={current}
              weekly={weekly}
              getTime={getTime}
              getDay={getDay}
              changeFocus={changeFocus}
              f={f}
              c={c}
              metric={metric}
            />
          }
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleControls"
          role="button"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleControls"
          role="button"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a>
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
