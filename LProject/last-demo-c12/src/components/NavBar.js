//NavBar.js
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

export function NavBar() {
    const user = useSelector(({user}) => {
        console.log(user);
        return user.currentUser;
    })
    const navigate = useNavigate()
    return (
        <>

            <Link to={'/home'}>Trang chủ</Link> |
            <Link to={'/home/create'}>Thêm mới</Link> |
            User: {user && user.username} |
            <button onClick={() => {
                localStorage.clear();
                navigate('/login')
            }}>Đăng xuất</button>
            <hr/>
        </>
    )
}