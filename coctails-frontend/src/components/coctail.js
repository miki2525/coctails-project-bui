import React, {useState} from 'react';
import ReactStars from 'react-rating-stars-component';
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

    const averageAndRound = (arr) => {
        var av = Math.round((arr.reduce((a, b) => a + b, 0) / arr.length) * 2) / 2;
        return Number.isNaN(av) ? 'Brak oceny. Bądź pierwszy!' : av;
    }

    return (
        <section className="coctail">
            <img className="imgCoctail" src={image}/>
            <h1>{name}</h1>
            <h3>Typ: {type}</h3>
            <button id={"btnDetails#" + id} className="btn btn-info btnDetails" onClick={() => handleDetails(id)}>SZCZEGÓŁY
            </button>
            {showDetails && <>
                <div className="rates">
                    <h3>Ocena</h3>
                    <ReactStars classNames="stars" count={5}
                                value={averageAndRound(ratings)}
                                onChange={(rate) => console.log(rate)}
                                size={25}/>
                    <div className="avgRateText"> Średnia ocena: {averageAndRound(ratings)} [liczba głosów:{' '}
                        {ratings.length}]
                    </div>
                </div>
                <h3 className="glass">Szkło: {glass}</h3>
                <IngredientsList list={ingredients}/>
                <Instructions steps={steps}/>
                <Comments comments={comments} />
            </>}

        </section>
    );
}
