import axios from "axios";

export const getUserInfoFetch = async (url: string, header: any) => {
  try {
    const response = await axios.get(url, header);
    return response.data;
  } catch (error) {
    console.warn(error);
    return error;
  }
};
