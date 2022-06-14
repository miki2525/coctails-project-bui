import React from 'react';
import {useAppCtx} from '../appContextProvider';
import {Navigate, useNavigate, useParams} from 'react-router-dom'
import Rates from "./rates";
import IngredientsList from "./ingredientsList";
import Instructions from "./instructions";
import Comments from "./comments";
import '../styles/coctailDetails.scss'
import AddComment from "./addComment";
import {Trash} from 'react-bootstrap-icons'

export default function DisplayCoctailDetails() {
    const {
        getCoctailDetails,
        getComments,
        authenticated_AdminRole,
        deleteCoctail,
        rateIt,
        downloadCoctail
    } = useAppCtx();
    const {id} = useParams();
    let navigate = useNavigate();

    const thisCoctail = getCoctailDetails(parseInt(id));

    if (thisCoctail === undefined) {
        return (<Navigate to="/404"/>)
    }

    const thisComments = getComments(parseInt(id));
    const showCreator = () => {
        let component = document.getElementById("addComment");
        component.style.display = 'block';
    }

    const handleEdit = (id) => {
        let path = "/coctailEdit/" + id;
        navigate(path);
    }

    const handleDelete = (id) => {
        deleteCoctail(parseInt(id));
    }

    return (
        <div className="coctailDetails">
            {authenticated_AdminRole && (<div>
                <button id={"btnEdit#" + id} className="btn btn-warning btnDetails"
                        onClick={() => handleEdit(id)}>EDYTUJ
                </button>
                <button id={"btnDelete#" + id} className="btn btn-danger btnDetails"
                        onClick={() => handleDelete(id)}><Trash size={22}/>
                </button>
            </div>)}

            <div className="general">
                <div><img className="imgCoctail" src={thisCoctail.image}/></div>
                <div>
                    <h1>{thisCoctail.name}</h1>
                    <button className="btn btn-primary" onClick={() => downloadCoctail(parseInt(id))}>Pobierz przepis
                    </button>
                </div>
            </div>
            <h3>Typ: {thisCoctail.type}</h3>
            <Rates id={thisCoctail.id} ratings={thisCoctail.ratings}
                   onChange={(rate) => rateIt(parseInt(id), rate)}/>
            <h3 className="glass">Szkło: {thisCoctail.glass}</h3>

            <IngredientsList list={thisCoctail.ingredients}/>
            <Instructions steps={thisCoctail.steps}/>

            <Comments comments={thisComments}/>
            <button onClick={() => showCreator()}>Dodaj komentarz</button>
            <div id="addComment"><AddComment idCoctail={id}/></div>
        </div>
    );
}
