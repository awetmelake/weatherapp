import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles

//actions
import { fetchCurrent, fetchWeekly } from "../actions/weatherActions";
import { fetchUserLocation, fetchUserZip } from "../actions/locationActions";

//components
import CurrentForecast from "./current/CurrentForecast";
import Weeklyforecast from "./weekly/Weeklyforecast";

//Main component, contains unit converting functons
class Weather extends Component {
  state = {
    zipcode: "",
    err: ""
  };

  componentDidMount() {
    //weather fetch functions
    this.props
      .fetchUserLocation()
      .then(() => {
        this.props.fetchCurrent().then(() => {
          this.props.fetchWeekly();
        });
      })
      .catch(err => alert(err));
  }

  handleChange = e => {
    this.setState({
      zipcode: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const zipcode = parseInt(this.state.zipcode, 10);
    if (this.state.zipcode.length > 4 && !isNaN(zipcode)) {
      this.props.fetchUserZip(zipcode);
      //recall fetch functions if user entered zipcode
      this.props
        .fetchUserLocation()
        .then(() => {
          this.props.fetchCurrent().then(() => {
            this.props.fetchWeekly();
            AOS.refreshHard();
          });
          //reset state
          this.setState({
            zipcode: "",
            err: ""
          });
        })
        .catch(err => alert(err));
    } else {
      this.setState({
        err: "invalid entry"
      });
    }
  };

  // converting functions//
  //convert kalvin to fahrenheight
  f = temp => Math.round(((temp - 273.15) * 9) / 5 + 32);
  //convert kalvin to celcius
  c = temp => Math.round(temp - 273.15);
  //convert wind from m/s to mph
  windMph = speed => Math.round(speed * 2.23694);
  //convert wind from m/s to kph
  windKph = speed => Math.round(speed * 3.6);

  //converts unix time to day
  getDay = date => {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    return days[date.getDay()];
  };

  //converts unix time to time
  getTime = date => {
    date = date.getHours();
    return date > 12 ? `${(date -= 12)} pm` : `${date} am`;
  };

  render() {
    AOS.init();
    const { err, current, weekly } = this.props;
    return weekly.message == 0 ? (
      <h3 className="loading-message">LOADING...</h3>
    ) : (
      <div data-aos-duration="10000" data-aos="fade-in">
        <form
          onSubmit={e => this.handleSubmit(e)}
          className="change-location-form"
        >
          <input
            onChange={e => this.handleChange(e)}
            placeholder="search by zipcode..."
            value={this.state.zipcode}
            type="text"
          />
          <p>{err}</p>
        </form>
        <h1>{current.name}</h1>
        <CurrentForecast
          windKph={this.windKph}
          windMph={this.windMph}
          f={this.f}
          c={this.c}
          getDay={this.getDay}
          getTime={this.getTime}
        />
        <Weeklyforecast
          getTime={this.getTime}
          getDay={this.getDay}
          f={this.f}
          c={this.c}
          current={current}
        />
      </div>
    );
  }
}

Weather.propTypes = {
  current: PropTypes.object.isRequired,
  weekly: PropTypes.object.isRequired,
  focus: PropTypes.object.isRequired,
  err: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  current: state.weather.current,
  weekly: state.weather.weekly,
  focus: state.weather.focus,
  err: state.weather.err
});

export default connect(
  mapStateToProps,
  { fetchCurrent, fetchWeekly, fetchUserLocation, fetchUserZip }
)(Weather);
