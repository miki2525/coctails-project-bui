import React, {useState} from 'react';
import IngredientsList from "./ingredientsList";
import Instructions from "./instructions";
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
            <button id={"btnDetails#" + id} className="btn btn-info" onClick={() => handleDetails(id)}>SZCZEGÓŁY
            </button>
            {showDetails && <>
                {/*{stars}*/}
                <IngredientsList list={ingredients}/>
                <Instructions steps={steps}/>
                {/*{comments}*/}
            </>}

        </section>
    );
}
