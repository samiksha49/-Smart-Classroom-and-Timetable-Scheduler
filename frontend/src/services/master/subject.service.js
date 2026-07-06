import api from "../api/axios";

export const getSubjectList = async (page = 1, pageSize = 10) => {
  const response = await api.get(
    `/subjects?page=${page}&page_size=${pageSize}`,
  );

  return response.data;
};

export const createSubject = async (payload) => {
  const response = await api.post("/subjects", payload);

  return response.data;
};

export const updateSubject = async ({ id, payload }) => {
  const response = await api.put(`/subjects/${id}`, payload);

  return response.data;
};
