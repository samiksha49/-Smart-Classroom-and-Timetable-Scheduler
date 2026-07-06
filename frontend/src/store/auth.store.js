import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      auth: null,

      setAuth: (data) =>
        set({
          auth: data,
        }),

      clearAuth: () =>
        set({
          auth: null,
        }),
    }),

    {
      name: "timetable-auth",
    }
  )
);

export default useAuthStore;
