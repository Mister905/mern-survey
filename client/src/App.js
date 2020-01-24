import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

// COMPONENTS
import Header from "./components/layout/header/Header";
import Landing from "./components/landing/Landing";
import Dashboard from "./components/dashboard/Dashboard";
import CreateSurvey from "./components/surveys/create_survey/CreateSurvey";
import AddCredits from "./components/credits/add_credits/AddCredits";
import EmailResponse from "./components/email_response/EmailResponse";
import ReviewSurvey from "./components/surveys/review_survey/ReviewSurvey";
import PrivateRoute from './components/private_route/PrivateRoute';

// ACTIONS
import { get_current_user } from "./actions/auth";

class App extends Component {
  componentDidMount = () => {
    this.props.get_current_user();
  };

  render() {
    const { current_user, loading_user } = this.props.auth;
    return (
      <div>
        <BrowserRouter>
          <Header />
          <Switch>
            {Object.entries(current_user).length === 0 &&
              current_user.constructor === Object &&
              loading_user && <LoadingScreen />}
            <Route exact path="/" component={Landing} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute
              exact
              path="/surveys/create"
              component={CreateSurvey}
            />
            <PrivateRoute
              exact
              path="/surveys/review"
              component={ReviewSurvey}
            />
            <PrivateRoute exact path="/credits/add" component={AddCredits} />
            <PrivateRoute exact path="/thanks" component={EmailResponse} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { get_current_user })(App);
