import React from 'react';
import {useAppCtx} from '../../appContextProvider';
import ReactStars from 'react-rating-stars-component';


export default function Rates({id, ratings}) {

    const {rateIt} = useAppCtx();

    const averageAndRound = (arr) => {
        var av = Math.round((arr.reduce((a, b) => a + b, 0) / arr.length) * 2) / 2;
        return Number.isNaN(av) ? 'Brak oceny. Bądź pierwszy!' : av;
    }

    return (
        <div className="ratesContainer">
            <h3>Ocena</h3>
            <ReactStars classNames="stars" count={5}
                        value={averageAndRound(ratings)}
                        onChange={(rate) => rateIt(id, rate)}
                        size={25}
            />
            <div className="avgRateText"> Średnia ocena: {averageAndRound(ratings)} [liczba głosów:{' '}
                {ratings.length}]
            </div>
        </div>
    );
}
