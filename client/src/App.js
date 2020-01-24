import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from 'react-redux';

// COMPONENTS
import Header from "./components/layout/header/Header";
import Landing from "./components/landing/Landing";
import Dashboard from "./components/dashboard/Dashboard";
import CreateSurvey from "./components/surveys/create_survey/CreateSurvey";
import AddCredits from "./components/credits/add_credits/AddCredits";
import EmailResponse from "./components/email_response/EmailResponse";
import ReviewSurvey from './components/surveys/review_survey/ReviewSurvey';

// ACTIONS
import { get_current_user } from "./actions/auth";

class App extends Component {
  componentDidMount = () => {
    this.props.get_current_user();
  };

  render() {
    return (
      <div>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/surveys/create" component={CreateSurvey} />
            <Route exact path="/surveys/review" component={ReviewSurvey} />
            <Route exact path="/credits/add" component={AddCredits} />
            <Route exact path="/thanks" component={EmailResponse} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, { get_current_user })(App);
