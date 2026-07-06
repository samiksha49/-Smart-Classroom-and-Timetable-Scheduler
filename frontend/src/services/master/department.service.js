import api from "../api/axios";

export const getDepartmentList = async ( page = 1, pageSize = 10 ) => {
  const response = await api.get(`/departments?page=${page}&page_size=${pageSize}`);
  return response.data;
};

export const createDepartment = async (payload) => {
  const response = await api.post("/departments", payload);

  return response.data;
};

export const updateDepartment = async ({ id, payload }) => {
  const response = await api.put(`/departments/${id}`, payload);

  return response.data;
};
