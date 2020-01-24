import axios from "axios";
import { GET_CURRENT_USER } from "./types";

export const get_current_user = () => async dispatch => {
  try {
    const res = await axios.get("/auth/current_user");
    dispatch({
      type: GET_CURRENT_USER,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};