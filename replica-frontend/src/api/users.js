import api from "./axios";

export const getUser = async (id) => {
  const res = await api.get(`/users/${id}`);
  return res.data;
};
