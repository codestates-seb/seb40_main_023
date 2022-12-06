import axios from "axios";

export const DeleteUserInfo = async (url: string, header: any) => {
  try {
    const response = await axios.delete(url, header);
    return response.data;
  } catch (error) {
    console.warn(error);
    return error;
  }
};
