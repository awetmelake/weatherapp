import React from "react";

//weekly forecast split into carousel items for bootstrap carousel
const Weeklyforecastitem = ({
  changeFocus,
  f,
  c,
  weekly,
  getTime,
  getDay,
  metric,
  current
}) => {
  let total = [];
  let section = [];

  // current weather item, push into array as first item
  section.push(
    <div
      onClick={e => changeFocus(current)}
      className="weekly-forecast-item"
      style={{ position: "relative", bottom: 0 }}
    >
      <img
        src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}
        alt="..."
        width="40px"
      />

      <p>now</p>

      {metric ? (
        <p>{c(current.main.temp) + " C"}</p>
      ) : (
        <p>{f(current.main.temp) + " F"}</p>
      )}
    </div>
  );

  let currentDay = getDay(new Date(current.dt * 1000));
  let lastDay = getDay(new Date(current.dt * 1000));
  //map through weekly forecast array from redux state
  weekly.list.map(item => {
    const date = new Date(item.dt * 1000);
    const time = getTime(date);
    currentDay = getDay(date);

    //split coming forecast items by day, giving each day of the week a differeny carousel section
    // push items that fall on the same day into section[] and then each different day into total[], total becomes 2d array of all weekly forecast items
    //first array needs active class for bootstrap carousel to function correctly
    if (total.length === 0 && currentDay !== lastDay) {
      total.push(<div className="carousel-item active">{section}</div>);
      section = [];
    }
    //the rest do not need the active class
    else if (total.length > 0 && currentDay !== lastDay) {
      total.push(<div className="carousel-item">{section}</div>);
      section = [];
    }

    //push individual item into section[]
    section.push(
      <div
        onClick={e => changeFocus(item)}
        className={`weekly-forecast-item`}
        key={item.dt}
        style={{
          position: "relative",
          bottom: item.main.temp - current.main.temp
        }}
      >
        <img
          className="weekly-icon"
          src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
          alt="weather icon"
          width="40px"
        />

        <p>{time}</p>
        <p>{metric ? c(item.main.temp) + " C" : f(item.main.temp) + " F"}</p>
      </div>
    );

    //variable holds day of current item and carries the value
    lastDay = getDay(date);
  });
  return total;
};

export default Weeklyforecastitem;
