export const BASE_URL = import.meta.env.VITE_SERVER_URL;

const API_URL = "/api/v1";

export const URLS = {
  REGISTER: API_URL + "/users/register",
  LOGIN: API_URL + "/users/login",
  GET_PROFILE: API_URL + "/users/get-currentUser",
  UPDATE_PROFILE: API_URL + "/users/update-profile",
  UPDATE_PROFILE_PIC: API_URL + "/users/update-profilePic",
  REMOVE_PROFILE_PIC: API_URL + "/users/remove-profilePic",
};
