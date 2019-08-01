import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Weeklyforecast extends Component {
  render() {
    const { f } = this.props;
    let counter = 0;
    return (
      <div className="weekly-forecast">
        {this.props.weekly.list.map(item => {
          if (counter > 7) {
            counter = 0;
          }
          return (
            <div
              className={`weekly-forecast-item weekly-forecast-item-${counter++} btn`}
              key={item.dt}
            >
              <img
                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt="weather icon"
                width='40px'
              />
              {/* {<p>{f(item.main.temp_min)}</p>
              <p>{f(item.main.temp_max)}</p>} */}
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
  {}
)(Weeklyforecast);
