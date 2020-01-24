import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Link, withRouter } from "react-router-dom";
import { create_survey, cancel_survey } from "../../../actions/surveys";

class ReviewSurvey extends Component {
  componentWillUnmount = () => {
    this.props.cancel_survey(this.props.history);
  };

  handle_submit = () => {
    const { active_survey } = this.props.surveys;
    this.props.create_survey(active_survey, this.props.history);
  };

  handle_cancel = () => {
    this.props.cancel_survey(this.props.history);
  };

  render() {
    const {
      survey_title,
      subject_line,
      email_body,
      recipient_list
    } = this.props.surveys.active_survey;

    return (
      <div>
        <div>
          <div className="container mt-50">
            <div className="row">
              <div className="col m2 offset-m2">
                <Link to={"/surveys/create"} className="btn">
                  <i className="material-icons custom-icon">arrow_back</i>
                </Link>
              </div>
              <div className="col m4 center-align">
                <div className="component-heading fw-500">
                  Review Your Survey
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col m8 offset-m2">
                <div className="card">
                  <div className="card-content">
                    <div className="review-section">
                      <div className="review-label survey-title-label bold-text">
                        Survey Title
                      </div>
                      <div className="review-output survey-title">
                        {survey_title}
                      </div>
                    </div>
                    <div className="review-section">
                      <div className="review-label subject-line-label">
                        Subject Line
                      </div>
                      <div className="review-output subject-line">
                        {subject_line}
                      </div>
                    </div>
                    <div className="review-section">
                      <div className="review-label email-body-label">
                        Email Body
                      </div>
                      <div className="review-output email-body">
                        {email_body}
                      </div>
                    </div>
                    <div className="review-section">
                      <div className="review-label recipient-list-label">
                        Recipient List
                      </div>
                      <div className="review-output recipient-list">
                        {recipient_list}
                      </div>
                    </div>
                    <div className="divider"></div>
                    <div className="row action-row">
                      <div className="col m4 offset-m8">
                        <div className="row mt-25 action-row">
                          <div className="col m6">
                            <button
                              onClick={this.handle_cancel}
                              className="btn red"
                            >
                              Cancel
                            </button>
                          </div>
                          <div className="col m6">
                            <button
                              onClick={this.handle_submit}
                              className="btn"
                            >
                              Send
                              <i className="material-icons send-icon right">
                                email
                              </i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  surveys: state.surveys
});

export default compose(
  connect(mapStateToProps, { create_survey, cancel_survey }),
  withRouter
)(ReviewSurvey);
