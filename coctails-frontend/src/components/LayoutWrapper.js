import React from 'react';
import {Link} from 'react-router';

export default function LayoutWrapper({children}) {
    return (
        <div className="index">
            <Link to="/">Home</Link>
            <Link to="/about">O nas</Link>
            {/*<Link to="/login">Zaloguj(admin)</Link>*/}
            <div className="mainContainer">
                {children}
            </div>
        </div>
    )
};
