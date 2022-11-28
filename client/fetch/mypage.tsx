import axios from "axios";
import { useRecoilState } from "recoil";
import { memberIdState } from "../recoil/memberId";
import { getCookie } from "../components/util/cookie";
const [memberId, setMemberId] = useRecoilState(memberIdState);

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
