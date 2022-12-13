import axios, { AxiosError } from "axios";

export const useFetch = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.warn(error.response);
      return error.response;
    }
  }
};
