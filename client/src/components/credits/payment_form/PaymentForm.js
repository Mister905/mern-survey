import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "redux";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  Elements,
  injectStripe
} from "react-stripe-elements";
import { connect } from "react-redux";
import { handle_stripe_token } from "../../../actions/stripe";

class PaymentForm extends Component {
  state = {
    error: {}
  };

  /* handleBlur = () => {
    console.log("[blur]");
  };

  handleChange = change => {
    console.log("[change]", change);
  };

  handleClick = () => {
    console.log("[click]");
  };

  handleFocus = () => {
    console.log("[focus]");
  };

  handleReady = () => {
    console.log("[ready]");
  }; */

  handleSubmit = async ev => {
    ev.preventDefault();
    if (this.props.stripe) {
      const token = await this.props.stripe.createToken();
      console.log(token);
      if (token.error) {
        this.setState({
          error: token.error
        });
      } else {
        const { history } = this.props;
        this.props.handle_stripe_token(token, history);
      }
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };

  render() {
    const { error } = this.state;

    return (
      <div id="survey-credits-form">
        <form onSubmit={this.handleSubmit}>
          <label>
            Card number
            <CardNumberElement
              onBlur={this.handleBlur}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onReady={this.handleReady}
            />
          </label>
          <label>
            Expiration date
            <CardExpiryElement
              onBlur={this.handleBlur}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onReady={this.handleReady}
            />
          </label>
          <label>
            CVC
            <CardCVCElement
              onBlur={this.handleBlur}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onReady={this.handleReady}
            />
          </label>
          <div className="payment-error center-align">
            {this.state.error.message}
          </div>
          <button className="btn right black btn-pay">Pay</button>
        </form>
      </div>
    );
  }
}

export default compose(
  connect(null, { handle_stripe_token }),
  withRouter,
  injectStripe
)(PaymentForm);
