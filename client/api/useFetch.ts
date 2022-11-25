import axios from "axios";

export const useFetch = async (url: string) => {
  try {
    const response = await axios.get(url);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
