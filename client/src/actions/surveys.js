import {
  REVIEW_SURVEY,
  CANCEL_SURVEY,
  GET_CURRENT_USER,
  GET_SURVEYS,
  CLEAR_SURVEYS
} from "./types";
import axios from "axios";

export const review_survey = (values, history) => async dispatch => {
  dispatch({
    type: REVIEW_SURVEY,
    payload: values
  });
  history.push("/surveys/review");
};

export const create_survey = (values, history) => async dispatch => {
  const res = await axios.post("/surveys/create", values);
  dispatch({
    type: GET_CURRENT_USER,
    payload: res.data
  });
  history.push("/dashboard");
};

export const cancel_survey = history => async dispatch => {
  dispatch({
    type: CANCEL_SURVEY
  });
  history.push("/dashboard");
};

export const get_surveys = () => async dispatch => {
  const res = await axios.get("/surveys");
  dispatch({
    type: GET_SURVEYS,
    payload: res.data
  });
};

export const clear_surveys = () => async dispatch => {
  dispatch({
    type: CLEAR_SURVEYS
  });
};