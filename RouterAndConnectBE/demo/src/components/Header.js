import {Link} from "react-router-dom";

export function Header() {
    return (
        <>
            <h3>Đây là header</h3>
            <Link to={'/home/list'}>Home</Link> |
            <Link to={'/home/create'}>Create</Link>
            <hr/>
        </>
    )
}