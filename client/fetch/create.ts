import axios from "axios";
import { CreateMangoProps } from "../types/create";

export const createMg = async (url: string, body: CreateMangoProps) => {
  try {
    const response = await axios.post(url, body);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
