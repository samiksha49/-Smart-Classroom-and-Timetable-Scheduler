import api from "../api/axios";

export const getBatchList = async (page = 1, pageSize = 10) => {
  const response = await api.get(`/batches?page=${page}&page_size=${pageSize}`);
  return response.data;
};

export const createBatch = async (payload) => {
  const response = await api.post("/batches", payload);

  return response.data;
};

export const updateBatch = async ({ id, payload }) => {
  const response = await api.put(`/batches/${id}`, payload);

  return response.data;
};
