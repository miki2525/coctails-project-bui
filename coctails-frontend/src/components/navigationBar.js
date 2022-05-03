import React from 'react';
import {NavLink, useLocation} from 'react-router-dom';
import Search from "./search";
import '../styles/navigationBar.scss'
import {House} from 'react-bootstrap-icons'

export default function NavigationBar() {

    let location = useLocation();

    if(location.pathname === '/404'){
        return null;
    }

    return (
        <div className="NavigationBar">
            <Search/>

            <div className="links">
            <NavLink className="link" to="/"><House size={22}></House></NavLink>
            <NavLink className="link" to="/about">O nas</NavLink>
            <NavLink className="link" to="/login">Zaloguj(admin)</NavLink>
            </div>
        </div>
    )
};
