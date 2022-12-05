import axios from "axios";
import { ReviewDataProps } from "../types/main";

export const createReview = async (
  url: string,
  body: ReviewDataProps,
  headers: {},
) => {
  try {
    const response = await axios.post(url, body, headers);
    return response.data;
  } catch (error) {
    return error;
  }
};
