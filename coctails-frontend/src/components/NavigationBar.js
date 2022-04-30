import React from 'react';
import {Link, useLocation} from 'react-router-dom';

export default function NavigationBar() {

    let location = useLocation();

    if(location.pathname === '/404'){
        return null;
    }

    return (
        <div id="NavigationBar">
            <Link to="/">Home</Link>
            <br/>
            <Link to="/about">O nas</Link>
            <br/>
            <Link to="/login">Zaloguj(admin)</Link>
        </div>
    )
};
