import React, { Component } from "react";
import Thumbs_Up from '../../assets/img/thumbs_up.gif';

class EmailResponse extends Component {
  render() {
    return (
      <div className="container">
        <div className="row mt-50">
          <div className="col m12">
            <div className="component-heading center-align fw-500">
              Thank you for your response!
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col m12">
            <p className="center-align thanks-message">
              Your participation in this program is greatly appreciated.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col m12 center-align">
          <img src={Thumbs_Up} alt="Thank You" className="thanks-gif" />
          </div>
        </div>
      </div>
    );
  }
}

export default EmailResponse;
