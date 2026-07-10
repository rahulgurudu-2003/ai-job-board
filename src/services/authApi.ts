import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/auth/";

let authErrorCallback: (() => void) | null = null;

export const setAuthErrorCallback = (cb: () => void) => {
    authErrorCallback = cb;
};

export const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: {
        "Content-Type": "application/json",
    },
});


api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);


api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401) {
            
            if (originalRequest._retry || originalRequest.url?.includes("token/refresh")) {
                if (authErrorCallback) authErrorCallback();
                return Promise.reject(error);
            }
            
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem("refreshToken");
                if (!refreshToken) {
                    throw new Error("No refresh token available");
                }
                const res = await axios.post(`${API_URL}token/refresh/`, {
                    refresh: refreshToken,
                });
                const { access } = res.data;
                localStorage.setItem("accessToken", access);
                originalRequest.headers.Authorization = `Bearer ${access}`;
                return api(originalRequest);
            } catch (refreshError) {
                if (authErrorCallback) authErrorCallback();
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export const authService = {
    async register(fullName: string, email: string, password: string, confirmPassword: string, avatar: File | null, resume: File | null) {
        const formData = new FormData();
        formData.append("full_name", fullName);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("confirm_password", confirmPassword);
        if (avatar) {
            formData.append("avatar", avatar);
        }
        if (resume) {
            formData.append("resume", resume);
        }

        const response = await api.post("api/auth/register/", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    },

    async login(email: string, password: string) {
        const response = await api.post("api/auth/login/", {
            email,
            password,
        });
        return response.data;
    },

    async logout(refreshToken: string) {
        const response = await api.post("api/auth/logout/", {
            refresh: refreshToken,
        });
        return response.data;
    },

    async getCurrentUser() {
        const response = await api.get("api/auth/me/");
        return response.data;
    },

    async getSavedJobs() {
        const response = await api.get("api/auth/saved-jobs/");
        return response.data;
    },

    async toggleSavedJob(jobId: number) {
        const response = await api.post("api/auth/saved-jobs/", { job_id: jobId });
        return response.data;
    },

    async deleteSavedJob(jobId: number) {
        const response = await api.delete(`api/auth/saved-jobs/${jobId}/`);
        return response.data;
    },

    async getApplications() {
        const response = await api.get("api/auth/applications/");
        return response.data;
    },

    async submitApplication(jobId: number) {
        const response = await api.post("api/auth/applications/", { job_id: jobId });
        return response.data;
    },

    async updateProfile(fullName?: string, email?: string, avatar?: File | null, resume?: File | null, githubLink?: string | null) {
        const formData = new FormData();
        if (fullName !== undefined) {
            formData.append("full_name", fullName);
        }
        if (email !== undefined) {
            formData.append("email", email);
        }
        if (avatar !== undefined) {
            if (avatar === null) {
                formData.append("avatar", "");
            } else {
                formData.append("avatar", avatar);
            }
        }
        if (resume !== undefined) {
            if (resume === null) {
                formData.append("resume", "");
            } else {
                formData.append("resume", resume);
            }
        }
        if (githubLink !== undefined) {
            formData.append("github_link", githubLink || "");
        }

        const response = await api.put("api/auth/me/", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    },
};
