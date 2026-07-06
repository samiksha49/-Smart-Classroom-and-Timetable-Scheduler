import api from "../api/axios";

export const getMasterDropdownList = async (tableName) => {
  const response = await api.get(`/${tableName}?page=-1`);

  return response.data;
};
