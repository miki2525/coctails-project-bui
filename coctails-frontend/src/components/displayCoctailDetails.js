import React from 'react';
import {useAppCtx} from '../appContextProvider';
import {Navigate, useParams} from 'react-router-dom'
import Rates from "./rates";
import IngredientsList from "./ingredientsList";
import Instructions from "./instructions";
import Comments from "./comments";
import '../styles/coctailDetails.scss'

export default function DisplayCoctailDetails() {
    // const [showDetails, setVisibility] = useState(false);
    const {getCoctailDetails, getComments} = useAppCtx();
    const {id} = useParams();
    const thisCoctail = getCoctailDetails(parseInt(id));

    if (thisCoctail === undefined) {
        return (<Navigate to="/404"/>)
    }

    const thisComments = getComments(parseInt(id));

    return (
        <section className="coctailDetails">
            <img className="imgCoctail" src={thisCoctail.image}/>
            <h1>{thisCoctail.name}</h1>
            <h3>Typ: {thisCoctail.type}</h3>
            <Rates id={thisCoctail.id} ratings={thisCoctail.ratings}/>
            <h3 className="glass">Szkło: {thisCoctail.glass}</h3>
            <IngredientsList list={thisCoctail.ingredients}/>
            <Instructions steps={thisCoctail.steps}/>
            <Comments comments={thisComments}/>
        </section>
    );
}
