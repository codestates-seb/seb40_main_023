import axios from "axios";
import { Body } from "../types/lucky";

export const createBag = async (url: string, body: Body) => {
  try {
    const response = await axios.post(url, body);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
