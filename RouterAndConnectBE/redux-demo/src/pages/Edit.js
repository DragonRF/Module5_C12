//Edit.js
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';

const SchemaError = Yup.object().shape({
    name: Yup.string()
        .min(2, "Too short")
        .required("Required"),
    description: Yup.string()
        .min(2, "Too short")
        .required("Required")
});

export function Edit() {
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3001/students/${id}`).then((res) => {
            setStudent(res.data);
        });
    }, [id]);

    const handleFormSubmit = (values) => {
        axios.put(`http://localhost:3001/students/${id}`, values).then(() => {
            navigate('/home/list');
        });
    };

    return (
        <div className="container">
            <h3>Đây là edit {id}</h3>
            {student ? (
                <Formik
                    initialValues={{
                        name: student.name || '',
                        description: student.description || '',
                        action: student.action || 'Xem xét'
                    }}
                    validationSchema={SchemaError}
                    onSubmit={handleFormSubmit}
                >
                    <Form>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label"> Name </label>
                            <Field type="text" name="name" className="form-control" />
                            <ErrorMessage name="name" component="div" className="text-danger" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label"> Description </label>
                            <Field type="text" name="description" className="form-control" />
                            <ErrorMessage name="description" component="div" className="text-danger" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="action" className="form-label"> Action </label>
                            <Field as="select" name="action" className="form-control">
                                <option value="Xem xét">Xem xét</option>
                                <option value="Đạt">Đạt</option>
                                <option value="Tốt">Tốt</option>
                            </Field>
                        </div>
                        <button type="submit" className="btn btn-primary"> Cập nhật </button>
                    </Form>
                </Formik>
            ) : (
                <div>Loading......</div>
            )}
        </div>
    );
}
