import React, { Component } from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import PaymentForm from "../payment_form/PaymentForm";
import { Link } from 'react-router-dom';

class AddCredits extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_BgchdGWnl40zV0EPuAc3oH1g00lONxWc46">
        <div className="container">
          <div className="row mt-25">
            <div className="col m2 offset-m2">
              <Link to={"/dashboard"} className="btn black">
                <i className="material-icons custom-icon">arrow_back</i>
              </Link>
            </div>
            <div className="col m4 center-align">
              <div className="component-heading fw-500">
                Add Credits
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col m12">
              <div className="add-credits-subheading center-align">
                $5 for 5 Emails
              </div>
              <p className="center-align center-align grey-text test-card-heading">
                Test Card Number: 4242 4242 4242 4242
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col m4 offset-m4">
              <Elements>
                <PaymentForm />
              </Elements>
            </div>
          </div>
        </div>
      </StripeProvider>
    );
  }
}

export default AddCredits;
