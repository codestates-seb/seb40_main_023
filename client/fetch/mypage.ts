import axios from "axios";

export const useDelete = async (url: string) => {
  try {
    const response = await axios.delete(url);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const usePut = async (url: string) => {
  try {
    const response = await axios.put(url);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getMyPageMember = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return error;
  }
};
