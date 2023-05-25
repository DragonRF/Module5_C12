import { Link, useNavigate } from "react-router-dom";
import { Form, Formik, Field } from "formik";
import { useDispatch } from "react-redux";
import { login } from "../../services/userService";
import 'bootstrap/dist/css/bootstrap.css';


export function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (values) => {
        dispatch(login(values)).then((response) => {
            if (response.payload === "User does not exist") {
                navigate("/login");
            } else {
                navigate("/home");
            }
        });
    };

    return (
        <>
            <center>
                <h3>Trang Đăng Nhập</h3>
                <Formik
                    initialValues={{
                        username: "",
                        password: "",
                    }}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <Field type="text" placeholder="Username" name="username" />
                        <br />
                        <Field type="password" placeholder="Password" name="password" />
                        <br />
                        <Link to="/register">Đăng ký ngay?</Link>
                        <br />
                        <button type="submit">Đăng nhập</button>
                    </Form>
                </Formik>
            </center>
        </>
    );
}
