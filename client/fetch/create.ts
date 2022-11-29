import axios from "axios";
import { CreateMangoProps } from "../types/create";

export const createMg = async (
  url: string,
  body: CreateMangoProps,
  header: {},
) => {
  try {
    const response = await axios.post(url, body, header);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
