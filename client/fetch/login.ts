import axios from "axios";
import { loginBody } from "../types/login";

export const GoLogin = async (url: string, body: loginBody) => {
  try {
    const response = await axios.post(url, body);
    return response.data;
  } catch (error) {
    console.warn(error);
    return error;
  }
};
