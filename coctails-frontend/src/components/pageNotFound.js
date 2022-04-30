import React from 'react'
import {NavLink} from 'react-router-dom'
import '../styles/notFound.scss'

export default function PageNotFound() {
    return (
        <div className="NotFound">
            <div className="mars"/>
            <img src="https://assets.codepen.io/1538474/404.svg" className="logo-404"/>
            <img src="https://assets.codepen.io/1538474/meteor.svg" className="meteor"/>
            <p className="title">O nieeeee!!</p>
            <p className="subtitle">
                Odleciałeś pod zły adres URL <br/> albo strona już nie istnieje.
            </p>
            <div align="center">
                <NavLink className="btn-back" to="/">Wróć na Ziemię</NavLink>
            </div>
            <img src="https://assets.codepen.io/1538474/astronaut.svg" className="astronaut"/>
            <img src="https://assets.codepen.io/1538474/spaceship.svg" className="spaceship"/>
        </div>
    );

}
