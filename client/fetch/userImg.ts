import axios from "axios";

export const uploadUserImg = async (url: string, body: any, header: {}) => {
  try {
    const response: any = await axios.post(url, body, header);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
