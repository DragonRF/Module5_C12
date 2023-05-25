//StudentSlice.js
import {createSlice} from "@reduxjs/toolkit";
import {getStudents,createStudent,
    deleteStudent,
    updateStudent,} from "../../services/studentServices";

const initialState = {
    list: []
}
const studentSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getStudents.fulfilled, (state, action) => {
            state.students = action.payload;
        });
        builder.addCase(createStudent.fulfilled, (state, action) => {
            state.students.push(action.payload);
        });
        builder.addCase(deleteStudent.fulfilled, (state, action) => {
            state.students.splice(action.payload);
        });
        builder.addCase(updateStudent.fulfilled, (state, action) => {
            state.students = action.payload;
        });
    }
})

export default studentSlice.reducer;