//customAPI.js
import axios from "axios";

const customAPI = axios.create({
    baseURL: 'http://localhost:3001/',
    headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
    }
})
export default customAPI;