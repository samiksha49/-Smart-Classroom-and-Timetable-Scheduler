import api from "../api/axios";

export const generateTimetable =
    async () => {

        const response =
            await api.post(
                "/timetable/generate"
            );

        return response.data;
    };

export const getTimetable =
    async (batchId) => {

        const response =
            await api.get(
                `/timetable/${batchId}`
            );

        return response.data;
    };