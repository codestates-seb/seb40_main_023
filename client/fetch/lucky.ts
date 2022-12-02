import axios from "axios";
import { CreateLuckyProps, PatchbagProps } from "../types/lucky";

export const createBag = async (url: string, body: CreateLuckyProps) => {
  try {
    const response = await axios.post(url, body);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
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
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
