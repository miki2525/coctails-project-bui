import React, {useState} from 'react';
import {useAppCtx} from '../appContextProvider';
import Coctail from "./coctail";
import '../styles/coctailWrapper.scss'

export default function DisplayCoctails() {
    const {coctails, comments} = useAppCtx();

    if (coctails.length < 1){
        return (
          <div> Lista jest pusta </div>
        );
    }

    return (
        <div className="coctailWrapper">
            {
                coctails.map((coctail) => {
                        return (
                            <Coctail  {...coctail} key={coctail.name}
                                      comments={comments.filter((comment) => comment.id_coctail === coctail.id)}/>
                        )
                    }
                )}
        </div>
    );
}

