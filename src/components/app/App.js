import React from "react";
import { connect } from "react-redux";

// styles
import "./App.css";

// components
import Weather from "../Weather.js";
import Footer from "../Footer.js";
import Spinner from "../Spinner/Spinner.js";

// actions
import { fetchCurrent, fetchWeekly } from "../../actions/weatherActions";
import { fetchUserLocation, setUserZip } from "../../actions/locationActions";

class App extends React.Component {
  render() {
    if(this.props.loading){
      return <Spinner/>
    }
    return (
      <React.Fragment>
        <div className="App" data-aos-duration="10000" data-aos="fade-in">
          <Weather />
        </div>
        <Footer />
      </React.Fragment>
    );
  }

  componentDidMount() {
    this.props
      .fetchUserLocation()
      .then(() => {
        this.props.fetchCurrent();
        this.props.fetchWeekly();
      })
      .catch(err => console.log(err));
  }
}

const mapStateToProps = state => ({
  loading: state.ui.loading
})
export default connect(
  mapStateToProps,
  { fetchCurrent, fetchWeekly, fetchUserLocation, setUserZip }
)(App);
