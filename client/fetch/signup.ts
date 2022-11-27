import axios from "axios";
import { signupBody } from "../types/signup";
export const signUp = async (url: string, body: signupBody) => {
  try {
    const response = await axios.post(url, body);
    console.log(response);
  } catch (error) {
    console.log(error);
    return error;
  }
};

//쓰는거 보류
