import React, {useState} from 'react';
import Rates from "./rates";
import IngredientsList from "./ingredientsList";
import Instructions from "./instructions";
import Comments from "./comments";
import '../styles/coctail.scss'

export default function Coctail({id, name, image, type, glass, ratings, ingredients, steps, comments}) {
    const [showDetails, setVisibility] = useState(false);


    const handleDetails = (id) => {
        var btn = document.getElementById("btnDetails#" + id);
        btn.innerText === "SZCZEGÓŁY" ? btn.innerText = "ZWIŃ" : btn.innerText = "SZCZEGÓŁY"
        setVisibility(!showDetails);
    }

    return (
        <section className="coctail">
            <img className="imgCoctail" src={image}/>
            <h1>{name}</h1>
            <h3>Typ: {type}</h3>
            <button id={"btnDetails#" + id} className="btn btn-info btnDetails"
                    onClick={() => handleDetails(id)}>SZCZEGÓŁY
            </button>
            {showDetails && <>
                <Rates id={id} ratings={ratings}/>
                <h3 className="glass">Szkło: {glass}</h3>
                <IngredientsList list={ingredients}/>
                <Instructions steps={steps}/>
                <Comments comments={comments}/>
            </>}
        </section>
    );
}
