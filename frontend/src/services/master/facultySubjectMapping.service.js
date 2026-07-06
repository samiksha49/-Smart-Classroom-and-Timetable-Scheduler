import api from "../api/axios";

export const getFacultySubjectMappings = async (page= 1, pageSize = 10) => {
  const response = await api.get(`/faculty-subject-mappings?page=${page}&page_size=${pageSize}`);
  return response.data;
};

export const createFacultySubjectMapping = async (payload) => {
  const response = await api.post("/faculty-subject-mappings", payload);

  return response.data;
};
