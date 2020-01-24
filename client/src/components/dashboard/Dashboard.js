import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { get_surveys, clear_surveys } from "../../actions/surveys";
import Loader from "../layout/loader/Loader";
import moment from "moment";

class Dashboard extends Component {
  componentDidMount = () => {
    this.props.get_surveys();
  };

  componentWillUnmount = () => {
    this.props.clear_surveys();
  };

  render_survey_list = () => {
    const { surveys, loading_surveys } = this.props.surveys;

    if (loading_surveys) {
      return (
        <div className="row">
          <div className="col m12 center-align">
            <Loader />;
          </div>
        </div>
      );
    } else {
      return surveys.map(survey => {
        return (
          <div className="row" key={survey._id}>
            <div className="col m8 offset-m2">
              <div className="card">
                <div className="card-content">
                  <div className="row">
                    <div className="col m12">
                      <div className="dashboard-survey-title fw-500">
                        {survey.title}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col m12">
                      <div className="dashboard-label survey-subject-label fw-500">
                        Survey Subject
                      </div>
                      <div className="dashboard-output dashboard-survey-subject">
                        {survey.subject}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col m12">
                      <div className="dashboard-label survey-body-label fw-500">
                        Survey Body
                      </div>
                      <div className="dashboard-output dashboard-survey-subject-body">
                        {survey.body}
                      </div>
                    </div>
                  </div>
                  <div className="divider"></div>
                  <div className="row">
                    <div className="col m6">
                      <div className="row">
                        <div className="col m12">
                          <div className="dashboard-label fw-500 response-header-label">
                            Survey Responses
                          </div>
                        </div>
                      </div>

                      <div className="row mt-25">
                        <div className="col m6 center-align">
                          <div className="response-label fw-500">YES</div>
                          <div className="response-output fw-500">
                            {survey.yes}
                          </div>
                        </div>
                        <div className="col m6 center-align">
                          <div className="response-label fw-500">NO</div>
                          <div className="response-output fw-500">
                            {survey.no}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="divider"></div>
                  <div className="row">
                    <div className="col m12">
                      <div className="dashboard-label date-sent-label fw-500">
                        Date Sent
                      </div>
                      <div className="dashboard-output dashboard-survey-date-sent">
                        {moment(survey.date_sent).format("MMMM D, YYYY")}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col m12">
                      <div className="dashboard-label last-response-label fw-500">
                        Last Response
                      </div>
                      <div className="dashboard-output dashboard-survey-last-reponse">
                        {moment(survey.last_response).format("MMMM D, YYYY")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      });
    }
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col m12 center-align">
            <h1>Surveys</h1>
          </div>
        </div>
        {this.render_survey_list()}
        <div className="fixed-action-btn">
          <Link to={"/surveys/create"} className="btn-floating btn-large black">
            <i className="material-icons add-icon">add</i>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  surveys: state.surveys
});

export default connect(mapStateToProps, { get_surveys, clear_surveys })(
  Dashboard
);
