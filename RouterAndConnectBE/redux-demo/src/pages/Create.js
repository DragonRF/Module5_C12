//Create.js
import { Form, Formik, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const SchemaError = Yup.object().shape({
    id: Yup.number()
        .min(2, "Too short")
        .required("Required"),
    name: Yup.string()
        .min(2, "Too short")
        .required("Required"),
    description: Yup.string()
        .min(2, "Too short")
        .required("Required")
});

export function Create() {
    const navigate = useNavigate();

    return (
        <div className="container">
            <Formik
                initialValues={{
                    id: '',
                    name: '',
                    description: '',
                    action: ''
                }}
                validationSchema={SchemaError}
                onSubmit={(values) => {
                    axios.post('http://localhost:3001/students', values).then(() => {
                        navigate('/home/list', { state: { name: 'Linh', isHandsome: 'Sure' } })
                    })
                }}
            >
                <Form>
                    <div className="mb-3">
                        <label htmlFor="id" className="form-label"> Id </label>
                        <Field type="text" name="id" className="form-control" />
                        <ErrorMessage name="id" component="div" className="text-danger" />
                    </div>
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
                    <button type="submit" className="btn btn-primary">Add</button>
                </Form>
            </Formik>
        </div>
    );
}
