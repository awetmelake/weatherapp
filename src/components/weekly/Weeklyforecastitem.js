import React from "react";

const Weeklyforecastitem = ({
  changeFocus,
  f,
  c,
  weekly,
  getTime,
  getDay,
  metric
}) => {
  let index = 1;
  let wfItems = [];
  let count = 0;
  let hold = [];
  weekly.list.map(item => {
    let date = new Date(item.dt * 1000);

    if (count > 6) {
      wfItems.push(<br />);
      count = 0;
      hold = [];
    } else {
      hold.push(
        <div
          onClick={e => changeFocus(index)}
          className={`weekly-forecast-item-${index} btn`}
          key={item.dt}
          index={index}
        >
          <img
            className="weekly-icon"
            src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
            alt="weather icon"
            width="40px"
          />

          <p>{getTime(date)}</p>
          <p>{metric ? c(item.main.temp) + " C" : f(item.main.temp) + " F"}</p>
        </div>
      );
    }

    index++;
    count++;
  });
  console.log(hold.length);
  return wfItems;
};

export default Weeklyforecastitem;
