import axios from "axios";

export const api = axios.create({
    baseURL: "https://ai-job-board-backend-zmpj.onrender.com/api",
});