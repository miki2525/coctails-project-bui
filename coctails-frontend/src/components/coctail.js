import React, {useState} from 'react';
import Rates from "./rates";
import IngredientsList from "./ingredientsList";
import Instructions from "./instructions";
import Comments from "./comments";
import {useNavigate} from 'react-router-dom'
import '../styles/coctail.scss'

export default function Coctail({id, name, image, type}) {

    let navigate = useNavigate();

    const handleDetails = (id) => {
        let path = "/coctail/" + id;
        navigate(path);
    }

    return (
        <section className="coctail">
            <img className="imgCoctail" src={image}/>
            <h1>{name}</h1>
            <h3>Typ: {type}</h3>
            <button id={"btnDetails#" + id} className="btn btn-info btnDetails"
                    onClick={() => handleDetails(id)}>SZCZEGÓŁY
            </button>
        </section>
    );
}
