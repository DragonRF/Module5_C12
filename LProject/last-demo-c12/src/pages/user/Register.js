import { Link, useNavigate } from "react-router-dom";
import { Form, Formik, Field } from "formik";
import { useDispatch } from "react-redux";
import { register } from "../../services/userService";
import 'bootstrap/dist/css/bootstrap.css';


export function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (values) => {
        dispatch(register(values)).then(() => {
            navigate("/login");
        });
    };

    return (
        <>
            <center>
                <h3>Trang Đăng Ký</h3>
                <Formik
                    initialValues={{
                        username: "",
                        password: "",
                    }}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <div class='mb-3'>
                            <Field type="text" placeholder="Username" name="username" />
                            <br />
                        </div>
                        <div class='mb-3'>
                            <Field type="password" placeholder="Password" name="password" />
                            <br />
                        </div>
                        <div class='mb-3'>
                            <Link to="/login">Đăng nhập ngay?</Link>
                            <br />
                        </div>
                        <button type="submit" class='btn btn-primary'>Đăng ký</button>
                    </Form>
                </Formik>
            </center>
        </>
    );
}
