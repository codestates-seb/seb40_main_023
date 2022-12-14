import axios, { AxiosResponse } from "axios";

export const uploadUserImg = async (
  url: string,
  body: FormData,
  header: {},
) => {
  try {
    const response: AxiosResponse = await axios.post(url, body, header);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
