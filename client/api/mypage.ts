import axios from "axios";

export const useDelete = async (endpoint: string) => {
  try {
    const response = await axios.delete(endpoint);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const usePut = async (endpoint: string) => {
  try {
    const response = await axios.put(endpoint);
    return response.data;
  } catch (error) {
    return error;
  }
};
