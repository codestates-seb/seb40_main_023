import axios from "axios";
import { EditMangoProps } from "../types/edit";

export const editMg = async (url: string, body: EditMangoProps, header: {}) => {
  try {
    const response = await axios.patch(url, body, header);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
