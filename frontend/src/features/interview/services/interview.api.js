import axios from 'axios';

const api = axios.create({
    baseURL : "http://localhost:3000/api/interview",
    withCredentials : true
});

export async function generateInterviewReport(formData) {
    try {
        const response = await api.post('/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || error.message || "Failed to generate report";
    }
}

export async function getInterviewHistory() {
    try {
        const response = await api.get('/history');
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || error.message || "Failed to fetch history";
    }
}
