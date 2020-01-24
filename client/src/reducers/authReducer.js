import { GET_CURRENT_USER } from "../actions/types";

const initial_state = {
  current_user: null
};

export default function(state = initial_state, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CURRENT_USER:
      return {
        ...state,
        current_user: payload || false
      };
    default:
      return state;
  }
}
