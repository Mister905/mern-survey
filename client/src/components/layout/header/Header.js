import React, { Component } from "react";
import { connect } from "react-redux";
import Loader from "../loader/Loader";
import { Link } from "react-router-dom";
import Logo_LG from '../../../assets/img/logo_landing.png';
import Logo_SM from '../../../assets/img/logo_nav.png';
import { FaGoogle } from "react-icons/fa";

class Header extends Component {
  render_header_content = () => {
    const { current_user } = this.props.auth;
    switch (current_user) {
      case null:
        return null;
      // Not Logged In
      case false:
        return (
          <nav className="landing-nav">
            <div className="nav-wrapper">
              <Link
                to={current_user ? "/dashboard" : "/"}
                className="brand-logo"
              >
                <img src={Logo_LG} alt="Logo" className="mern-survey-logo" />
              </Link>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li>
                  <a className="valign-wrapper" href="/auth/google">Login with Google <FaGoogle className="google-icon"/></a>
                </li>
              </ul>
            </div>
          </nav>
        );
      // Logged In
      default:
        return (
          <nav className="custom-nav">
            <div className="nav-wrapper">
              <Link
                to={current_user ? "/dashboard" : "/"}
                className="brand-logo"
              >
                <img src={Logo_SM} alt="Logo" className="mern-survey-logo" />
              </Link>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li>
                  <Link to={`/credits/add`}>Add Credits</Link>
                </li>
                <li>
                  <Link to={`/credits/add`}>
                    Credits: {current_user.credits}
                  </Link>
                </li>
                <li>
                  <a href="/auth/logout">Logout</a>
                </li>
              </ul>
            </div>
          </nav>
        );
    }
  };

  render() {
    return this.render_header_content();
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Header);
