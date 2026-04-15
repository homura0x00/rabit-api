import axios from "@/utils/request";
import { parseToken } from "@/utils/jwts";

export const register = async (params: { username: string; password: string }) => {
  const res = await axios.post("/api/users/register", params);
  return res;
};

export const login = async (params: { username: string; password: string }) => {
  const res = await axios.post("/api/users/login", params);
  if (res.data.data) {
    sessionStorage.setItem("token", JSON.stringify(parseToken(res.data.data)));
  }
  return res;
};

export const logout = () => {
  sessionStorage.removeItem("token");
};

