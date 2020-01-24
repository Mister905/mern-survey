import { REVIEW_SURVEY, CANCEL_SURVEY, GET_SURVEYS, CLEAR_SURVEYS } from "../actions/types";

const initial_state = {
  active_survey: {},
  surveys: [],
  loading_surveys: true
};

export default function(state = initial_state, action) {
  const { type, payload } = action;
  switch (type) {
    case REVIEW_SURVEY:
      return {
        ...state,
        active_survey: payload
      };
    case CANCEL_SURVEY:
      return {
        ...state,
        active_survey: {}
      };
    case GET_SURVEYS:
      return {
        ...state,
        surveys: payload,
        loading_surveys: false
      };
    case CLEAR_SURVEYS:
      return {
        ...state,
        surveys: [],
        loading_surveys: true
      };
    default:
      return state;
  }
}
