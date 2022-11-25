import axios from "axios";
import { ReviewDataProps } from "../types/main";

export const createReview = async (url: string, body: ReviewDataProps) => {
  try {
    const response = await axios.post(url, body);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
