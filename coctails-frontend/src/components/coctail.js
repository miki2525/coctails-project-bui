import React, {useState} from 'react';
import Rates from "./rates";
import IngredientsList from "./ingredientsList";
import Instructions from "./instructions";
import Comments from "./comments";
import {useNavigate} from 'react-router-dom'
import '../styles/coctail.scss'
import {Trash} from "react-bootstrap-icons";
import {useAppCtx} from "../appContextProvider";

export default function Coctail({id, name, image, type}) {
    const {authenticated_AdminRole, deleteCoctail} = useAppCtx();
    let navigate = useNavigate();

    const handleDetails = (id) => {
        let path = "/coctail/" + id;
        navigate(path);
    }

    const handleDelete = (id) => {
        deleteCoctail(parseInt(id));
    }

    return (
        <section className="coctail">
            <img className="imgCoctail" src={image}/>
            <h1>{name}</h1>
            <h3>Typ: {type}</h3>
            <button id={"btnDetails#" + id} className="btn btn-info btnDetails"
                    onClick={() => handleDetails(id)}>SZCZEGÓŁY
            </button>
            //make true below
            {!authenticated_AdminRole && (<div>
                <button id={"btnDelete#" + id} className="btn btn-danger btnDetails"
                        onClick={() => handleDelete(id)}><Trash size={22}/>
                </button>
            </div>)}
        </section>
    );
}
