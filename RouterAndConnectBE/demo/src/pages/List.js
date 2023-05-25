// List.js
import { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useLocation } from "react-router-dom";

export function List() {
    const [students, setStudents] = useState([]);
    const { state } = useLocation();
    const [isLoad, setIsLoad] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const url = searchQuery
            ? `http://localhost:3001/students/search/${encodeURIComponent(searchQuery)}`
            : 'http://localhost:3001/students';

        axios.get(url).then((res) => {
            setStudents(res.data);
            setIsLoad(false);
        });
    }, [searchQuery]);

    const deleteStudent = (id) => {
        axios.delete(`http://localhost:3001/students/${id}`).then(() => {
            setStudents(students.filter(item => item.id !== id));
        });
    };

    return (
        <div className="container">
            <div className="mb-3">
                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="form-control"
                />
            </div>
            {isLoad ? (
                <div>Loading......</div>
            ) : (
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th colSpan={2}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {students.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.action}</td>
                            <td>
                                <Link to={`/home/edit/${item.id}`} className="btn btn-primary">Edit</Link>
                            </td>
                            <td>
                                <button onClick={() => deleteStudent(item.id)} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}