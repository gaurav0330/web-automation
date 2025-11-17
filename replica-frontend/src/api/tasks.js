import api from "./axios";

export const getTasks = async () => {
  const res = await api.get("/tasks");
  return res.data;
};

export const createTask = async (data) => {
  const res = await api.post("/tasks", data);
  return res.data;
};
