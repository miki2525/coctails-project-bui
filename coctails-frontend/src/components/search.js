import React from 'react';
import {useAppCtx} from '../appContextProvider';
import {useLocation} from 'react-router-dom';

export default function Search() {

    const {coctailsSearch, setCoctails, resetCoctails} = useAppCtx();

    let location = useLocation();

    if(location.pathname !== '/'){
        return null;
    }

    const handleClick = (e) => {
        e.preventDefault();
        let query = e.target.value.toLowerCase();
        if (query.length < 1) {
            resetCoctails();
        } else {
            const searchedCoctails = coctailsSearch.filter((coctail) => {
                if (coctail.name.toLowerCase().match(query)) {
                    return coctail;
                } else {
                    return coctail.type.toLowerCase().match(query)
                }
            });
            setCoctails(searchedCoctails);
        }
    }

    const handleReset = () => {
        resetCoctails();
        let field = document.getElementById("searchField");
        field.value = '';
    }
    return (
        <div className="search">
            <input id="searchField" type="text"
                   placeholder={"Szukaj koktajlu"}
                   onChange={event => handleClick(event)}
            />
            <button type="reset" className="btn-warning btnResetSearch" onClick={() => handleReset()}>RESET</button>
        </div>
    );
}