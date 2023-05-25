//studentServices.js
import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const getStudents = createAsyncThunk(
    'students/getStudents',
    async () => {
        const res = await axios.get('http://localhost:3001/students')
        return res.data;
    }

)

export const createStudent = createAsyncThunk(
    'students/createStudent',
    async (newStudent) => {
        const response = await axios.post('http://localhost:3001/students', newStudent);
        return response.data;
    }
);

export const deleteStudent = createAsyncThunk(
    'students/deleteStudent',
    async (data) => {
        await axios.delete('http://localhost:3001/students/' + data);
        return data;
    }
);

export const updateStudent = createAsyncThunk(
    'students/updateStudent',
    async (data) => {
        const response = await axios.put('http://localhost:3001/students/' + data.id, data);
        return response.data;
    }
);