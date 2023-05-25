import {NavBar} from "../../components/NavBar";
import {Outlet} from 'react-router-dom';

export function Home() {
    return (
        <>
            <NavBar/>
            <Outlet/>
        </>
    )
}