import api from "../api/axios";

export const loginUser = async (payload) => {
  const response = await api.post("/auth/login", payload);
  return response.data;
};

export const verifyOtp = async (payload) => {
  const response = await api.post("/auth/verify-otp", payload);
  return response.data;
};

export const changePassword = (payload) => {
  return api.put("/user/change-password", payload);
};