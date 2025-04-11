import axios from "axios";

/**
 * Lấy tổng số liệu cho Admin Dashboard
 */
export const fetchDashboardSummary = async () => {
    const response = await axios.get("http://localhost:3001/api/admin/dashboard-summary");
    return response.data;
};