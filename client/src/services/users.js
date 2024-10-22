import instance from "../utils/api.js";
import { URLS } from "../constants/index.js";

const register = async (payload) => {
  return await instance.post(URLS.REGISTER, payload);
};

const login = async (payload) => {
  return await instance.post(URLS.LOGIN, payload);
};

const getCurrentUser = async () => {
  return await instance.get(URLS.GET_PROFILE);
};

export const userServices = {
  register,
  login,
  getCurrentUser,
};
