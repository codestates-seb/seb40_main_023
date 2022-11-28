import axios from "axios";
import { loginBody } from "../types/login";

export const GoLogin = async (url: string, body: loginBody) => {
  try {
    const response = await axios.post(url, body);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
