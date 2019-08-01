import React, { Component } from "react";

class Weeklyforecastitem extends Component {
  render() {
    const { changeFocus, f, weekly, getTime, getDay } = this.props;
    let index = 1;
    return weekly.list.map(item => {
      let date = new Date(item.dt * 1000);
      return (
        <div
          onClick={changeFocus.bind(this, index++)}
          className={`weekly-forecast-item btn`}
          key={item.dt}
        >
          <img
            className="weekly-icon"
            src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
            alt="weather icon"
            width="40px"
          />

          <p>{`${date.getDate()}  ${date.getHours()}`}</p>
          <p>{f(item.main.temp)}</p>
        </div>
      );
    });
  }
}

export default Weeklyforecastitem;
