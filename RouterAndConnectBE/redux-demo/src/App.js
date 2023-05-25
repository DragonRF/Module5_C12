// App.js
import React, { useEffect } from 'react';
import './App.css';
import {Create} from "./pages/Create";
import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home";
import {List} from "./pages/List";
import {Edit} from "./pages/Edit";
import { useDispatch, useSelector } from 'react-redux';
import { getStudents, createStudent, deleteStudent, updateStudent } from './services/studentServices';

function App() {
    const dispatch = useDispatch();
    const students = useSelector(({ students }) => students);

    useEffect(() => {
        dispatch(getStudents());
    }, [dispatch]);

    const handleCreateStudent = () => {
        const newStudent = {
            name: 'New Student',
            description: 'New Description',
            action: 'New Action',
        };
        dispatch(createStudent(newStudent));
    };

    const handleDeleteStudent = (id) => {
        dispatch(deleteStudent(id));
    };

    const handleUpdateStudent = (id) => {
        const updatedStudent = {
            name: 'Updated Student',
            description: 'Updated Description',
            action: 'Updated Action',
        };
        dispatch(updateStudent(id, updatedStudent));
    };

    return (
        <>
            <Routes>
                <Route path={'/home'} element={<Home/>}>
                    <Route path={'/home/list'} element={<List/>}/>
                    <Route path={'/home/create'} element={<Create/>}/>
                    <Route path={'/home/edit/:id'} element={<Edit/>}/>
                </Route>
            </Routes>
            {students.map((item) => (
                <div key={item.id}>
                    <h1>
                        {item.name}, {item.age}
                    </h1>
                    <button onClick={() => handleDeleteStudent(item.id)}>Delete</button>
                    <button onClick={() => handleUpdateStudent(item.id)}>Update</button>
                </div>
            ))}

            <button onClick={handleCreateStudent}>Create New Student</button>
        </>
    );
}

export default App;