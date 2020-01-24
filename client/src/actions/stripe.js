import axios from "axios";
import { GET_CURRENT_USER } from "./types";

export const handle_stripe_token = (token, history) => async dispatch => {
  try {
    const res = await axios.post("/stripe/add-credits", token);
    dispatch({
      type: GET_CURRENT_USER,
      payload: res.data
    });
    history.push("/dashboard");
  } catch (error) {
    console.log(error);
  }
};
