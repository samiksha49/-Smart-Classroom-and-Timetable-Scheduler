import api from "../api/axios";

export const getFacultyList = async (page = 1, pageSize = 10) => {
  const response = await api.get(`/faculties?page=${page}&page_size=${pageSize}`);
  return response.data;
};

export const createFaculty = async (payload) => {
  const response = await api.post("/faculties", payload);

  return response.data;
};

export const updateFaculty = async ({ id, payload }) => {
  const response = await api.put(`/faculties/${id}`, payload);

  return response.data;
};
