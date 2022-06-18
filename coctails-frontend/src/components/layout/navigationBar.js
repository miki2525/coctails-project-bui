import React from 'react';
import {NavLink, useLocation} from 'react-router-dom';
import Search from "./search";
import '../../styles/layout/navigationBar.scss'
import {House, PlusCircle} from 'react-bootstrap-icons'
import {useAppCtx} from "../../appContextProvider";

export default function NavigationBar() {
    const {authenticated_AdminRole} = useAppCtx();
    let location = useLocation();

    if (location.pathname === '/404') {
        return null;
    }

    return (
        <div className="NavigationBar">
            <Search/>

            {/*//todo add filters*/}
            {/*//todo add sorting*/}
            <div className="links">

                <NavLink className="link" to="/"><House size={22}></House></NavLink>
                {authenticated_AdminRole && (
                    <NavLink className="link" to="/createCoctail"><PlusCircle size={22}/></NavLink>
                )
                }
                <NavLink className="link" to="/about">O nas</NavLink>
                <NavLink className="link" to="/stats">Statystyki</NavLink>


            </div>
        </div>
    )
};
