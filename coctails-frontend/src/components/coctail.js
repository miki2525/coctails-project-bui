import React, {useState} from 'react';
import '../styles/coctail.scss'

export default function Coctail({id, name, image, type, glass, ratings, ingredients, steps, comments}) {
    const [showDetails, setVisibility] = useState(false);

    return (
        <section className="coctail">
            <img className="imgCoctail" src={image}/>
            <h1>{name}</h1>
            <h3>Typ: {type}</h3>
            <button className="btn btn-info" onClick={() => setVisibility(!showDetails)}>SZCZEGÓŁY</button>
            {showDetails && <>
                <IngredientsList list={ingredients} />
                {/*<Instructions steps={steps} />*/}
            </>}

        </section>
    );
}
