import instance from "../utils/api.js";
import { URLS } from "../constants/index.js";

const getContacts = async (payload) => {
  return instance.post(URLS.GET_CONTACTS, { payload });
};

export const contactsServices = {
  getContacts,
};
