import React, { Component } from "react";
import { connect } from "react-redux";
import M from "materialize-css";
import { Link } from "react-router-dom";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import { review_survey } from "../../../actions/surveys";

class CreateSurvey extends Component {
  constructor(props) {
    super(props);
    this.email_body = React.createRef();
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.values.email_body !== this.props.values.email_body) {
      M.textareaAutoResize(this.email_body.current);
    }
  };

  render() {
    const { values, errors, touched } = this.props;
    return (
      <div>
        <div className="container mt-50">
          <div className="row">
            <div className="col m2 offset-m2">
              <Link to={"/dashboard"} className="btn">
                <i className="material-icons custom-icon black">arrow_back</i>
              </Link>
            </div>
            <div className="col m4 center-align">
              <div className="component-heading fw-500">Create a New Survey</div>
            </div>
          </div>

          <Form>
            <div className="row mt-50">
              <div className="col m6 offset-m3">
                <div className="input-field">
                  <span
                    className={
                      "custom-label" +
                      (errors.survey_title && touched.survey_title
                        ? " error-label"
                        : "")
                    }
                  >
                    Survey Title
                  </span>
                  <Field
                    name="survey_title"
                    className={
                      errors.survey_title && touched.survey_title && "invalid"
                    }
                  />
                  {errors.survey_title && touched.survey_title && (
                    <span className="custom-helper-error">
                      {errors.survey_title}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col m6 offset-m3">
                <div className="input-field">
                  <span
                    className={
                      "custom-label" +
                      (errors.subject_line && touched.subject_line
                        ? " error-label"
                        : "")
                    }
                  >
                    Subject Line
                  </span>
                  <Field
                    name="subject_line"
                    className={
                      errors.subject_line && touched.subject_line && "invalid"
                    }
                  />
                  {errors.subject_line && touched.subject_line && (
                    <span className="custom-helper-error">
                      {errors.subject_line}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col m6 offset-m3">
                <div className="input-field">
                  <span
                    className={
                      "custom-label" +
                      (errors.email_body && touched.email_body
                        ? " error-label"
                        : "")
                    }
                  >
                    Email Body
                  </span>
                  <Field
                    id="email_body"
                    component="textarea"
                    name="email_body"
                    innerRef={this.email_body}
                    className={
                      "materialize-textarea " +
                      (errors.email_body && touched.email_body ? "invalid" : "")
                    }
                  />
                  {errors.email_body && touched.email_body && (
                    <span className="custom-helper-error">
                      {errors.email_body}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col m6 offset-m3">
                <div className="input-field">
                  <span
                    className={
                      "custom-label" +
                      (errors.recipient_list && touched.recipient_list
                        ? " error-label"
                        : "")
                    }
                  >
                    Recipient List
                  </span>
                  <Field
                    name="recipient_list"
                    className={
                      errors.recipient_list &&
                      touched.recipient_list &&
                      "invalid"
                    }
                  />
                  {errors.recipient_list && touched.recipient_list && (
                    <span className="custom-helper-error">
                      {errors.recipient_list}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col m6 offset-m3">
                <div className="input-field">
                  <button type="submit" className="btn right black">
                    Continue{" "}
                    <i className="material-icons right continue-icon">
                      navigate_next
                    </i>
                  </button>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

const FormikForm = withFormik({
  mapPropsToValues: props => {
    return {
      survey_title:
        typeof props.surveys.active_survey === "undefined"
          ? ""
          : props.surveys.active_survey.survey_title,

      subject_line:
        typeof props.surveys.active_survey === "undefined"
          ? ""
          : props.surveys.active_survey.subject_line,

      email_body:
        typeof props.surveys.active_survey === "undefined"
          ? ""
          : props.surveys.active_survey.email_body,

      recipient_list:
        typeof props.surveys.active_survey === "undefined"
          ? ""
          : props.surveys.active_survey.recipient_list
    };
  },
  validationSchema: Yup.object().shape({
    survey_title: Yup.string().required("Survey Title Is Required"),
    subject_line: Yup.string().required("Subject Line Is Required"),
    email_body: Yup.string().required("Email Body Is Required"),
    recipient_list: Yup.string().required("Recipient List Is Required")
  }),
  handleSubmit: (values, props) => {
    const { setFieldError } = props;

    const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const { recipient_list } = values;

    let invalid_emails = recipient_list
      .split(",")
      .map(email => email.trim())
      .filter(email => email_regex.test(email) === false)
      .join(", ");

    if (invalid_emails.length) {
      setFieldError(
        "recipient_list",
        `The following emails are invalid: ${invalid_emails}`
      );
    } else {
      props.props.review_survey(values, props.props.history);
    }
  }
})(CreateSurvey);

const mapStateToProps = state => ({
  surveys: state.surveys
});

export default connect(mapStateToProps, { review_survey })(FormikForm);
