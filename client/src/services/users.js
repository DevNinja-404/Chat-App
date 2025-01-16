import instance from "../utils/api.js";
import { URLS } from "../constants/index.js";

const register = async (payload) => {
  return await instance.post(URLS.REGISTER, payload);
};

const login = async (payload) => {
  return await instance.post(URLS.LOGIN, payload);
};

const logout = async () => {
  return await instance.post(URLS.LOGOUT);
};

const getCurrentUser = async () => {
  return await instance.get(URLS.GET_PROFILE);
};

const updateProfile = async (payload) => {
  return await instance.patch(URLS.UPDATE_PROFILE, payload);
};

const updateProfilePic = async (payload) => {
  return await instance.patch(URLS.UPDATE_PROFILE_PIC, payload);
};

const removeProfilePic = async () => {
  return await instance.patch(URLS.REMOVE_PROFILE_PIC, {});
};

export const userServices = {
  register,
  login,
  logout,
  getCurrentUser,
  updateProfile,
  updateProfilePic,
  removeProfilePic,
};
