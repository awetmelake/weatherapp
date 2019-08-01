import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { changeFocus } from "../actions/weatherActions";
class Weeklyforecast extends Component {
  componentWillMount() {
    this.props.changeFocus(2);
  }
  render() {
    const { f, getTime } = this.props;
    return (
      <div className="weekly">
        {this.props.weekly.list.map(item => {
          let date = new Date(item.dt * 1000);
          return (
            <div className={`weekly-forecast-item btn`} key={item.dt}>
              <img
                className="weekly-icon"
                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt="weather icon"
                width="40px"
              />

              <p>{date.getDate() + " " + date.getHours()}</p>
              <p>{f(item.main.temp_max)}</p>
              <p>{f(item.main.temp_min)}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

Weeklyforecast.propTypes = {
  weekly: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  weekly: state.weather.weekly
});

export default connect(
  mapStateToProps,
  { changeFocus }
)(Weeklyforecast);
