import axios from "axios";
import { CreateLuckyProps, PatchbagProps } from "../types/lucky";

export const createBag = async (url: string, body: CreateLuckyProps) => {
  try {
    const response = await axios.post(url, body);
    return response.data;
  } catch (error) {
    console.warn(error);
    return error;
  }
};

export const patchViewBag = async (
  url: string,
  body: PatchbagProps,
  header: {},
) => {
  try {
    const response = await axios.patch(url, body, header);
    return response.data;
  } catch (error) {
    console.warn(error);
    return error;
  }
};
