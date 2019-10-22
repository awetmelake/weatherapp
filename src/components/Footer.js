import React from 'react';

const Footer = ({}) => (
  <footer>
    <p style={{ position: "absolute", bottom: "0", left: "20px" }}>
      <a href="https://openweathermap.org/api">
        Powered by Open Weather Map API
      </a>
      {" | "}
      <a href="https://github.com/awetmelake/weatherapp">REPO</a>
      <br />
      Made by Awet Melake
    </p>
  </footer>
);

export default Footer;
