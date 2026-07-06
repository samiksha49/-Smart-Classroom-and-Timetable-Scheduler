import axios from "axios";

import useAuthStore from "../../store/auth.store";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,

  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token =
      useAuthStore.getState()?.auth?.access_token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,

  (error) => {
    const status = error?.response?.status;

    if (
      status === 401 ||
      status === 403
    ) {
      useAuthStore
        .getState()
        .clearAuth();

      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default api;
