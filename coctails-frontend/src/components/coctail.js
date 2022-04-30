import React from 'react';
import '../styles/coctail.scss'

export default function Coctail({id, name, image, type, glass, ratings, ingredients, steps, comments}) {


    return (
        <section className="coctail">
            <img className="imgCoctail" src={image}/>
            <h1>{name}</h1>
            <h3>Typ: {type}</h3>

            {/*///TODO button on click show the rest*/}
            {/*<IngredientsList list={ingredients} />*/}
            {/*<Instructions steps={steps} />*/}
        </section>
    );
}
