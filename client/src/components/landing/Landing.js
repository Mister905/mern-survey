import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import Logo from "../../assets/img/logo_landing.png";
import M from "materialize-css";

class Landing extends Component {
  constructor() {
    super();
    document.body.classList.add("landing-bg");
  }

  componentDidMount = () => {
    if (this.props.auth.current_user) {
      this.props.history.push("/dashboard");
    }
  };

  componentWillUnmount = () => {
    document.body.classList.remove("landing-bg");
  };

  render() {
    console.log("derp");
    return (
      <div>
        <div id="landing-overlay"></div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default compose(connect(mapStateToProps), withRouter)(Landing);
