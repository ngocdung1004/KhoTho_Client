import axios from "axios";

const API_URL = "http://localhost:7062";

const axiosInstance = axios.create({
    baseURL: API_URL,
});

// Tự động thêm token JWT vào header Authorization
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const getCurrentUser = async () => {
    try {
        const response = await axiosInstance.get("/api/users/me");
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
        throw error;
    }
};

export const updateCurrentUser = async (userData) => {
    try {
        const response = await axiosInstance.put(`/api/users/${userData.userId}`, userData);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi cập nhật thông tin người dùng:", error);
        throw error;
    }
};
