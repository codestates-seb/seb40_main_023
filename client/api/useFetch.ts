import axios from "axios";

export const useFetch = async (endpoint: string) => {
  try {
    const response = await axios.get(endpoint);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
