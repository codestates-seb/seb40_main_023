import axios from "axios";
interface Body {
  luckMangoId: number;
  body: string;
  writer: string;
  viewed: boolean;
  bagStyle: number;
  bagColor: number;
}

export const createBag = async (endpoint: string, body: Body) => {
  try {
    const response = await axios.post(endpoint, body);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
