import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import Search from "./search";

export default function NavigationBar() {

    let location = useLocation();

    if(location.pathname === '/404'){
        return null;
    }

    return (
        <div className="NavigationBar">
            <Search/>

            <div className="links">
            <Link to="/">Home</Link>
            <br/>
            <Link to="/about">O nas</Link>
            <br/>
            <Link to="/login">Zaloguj(admin)</Link>
            </div>
        </div>
    )
};
