import axios from "axios";
import { CreateMangoProps, UploadImgProps } from "../types/create";

export const createMg = async (
  url: string,
  body: CreateMangoProps,
  header: {},
) => {
  try {
    const response = await axios.post(url, body, header);
    return response.data;
  } catch (error) {
    console.warn(error);
    return error;
  }
};

export const uploadMgImg = async (
  url: string,
  body: UploadImgProps,
  header: {},
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  try {
    setLoading(true);
    const response = await axios.post(url, body, header);
    return response;
  } catch (error) {
    console.warn(error);
    return error;
  }
};
