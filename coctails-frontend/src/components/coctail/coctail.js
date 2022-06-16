import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import '../../styles/coctail/coctail.scss'
import {Trash} from "react-bootstrap-icons";
import {useAppCtx} from "../../appContextProvider";

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
        <div className="col-xl-12 col-lg-4 col-md-6 col-sm-12">
            <div className="coctail">
                <figure><img className="imgCoctail" src={image}/></figure>
                <h1>{name}</h1>
                <h3>Typ: {type}</h3>
                <button id={"btnDetails#" + id} className="btn btn-info btnDetails"
                        onClick={() => handleDetails(id)}>SZCZEGÓŁY
                </button>
                {authenticated_AdminRole && (<div>
                    <button id={"btnDelete#" + id} className="btn btn-danger btnDetails"
                            onClick={() => handleDelete(id)}><Trash size={22}/>
                    </button>
                </div>)}
            </div>
        </div>
    );
}
