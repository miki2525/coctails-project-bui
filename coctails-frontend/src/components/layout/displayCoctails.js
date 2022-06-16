import React from 'react';
import {useAppCtx} from '../../appContextProvider';
import Coctail from "../coctail/coctail";
import '../../styles/layout/coctailWrapper.scss'

export default function DisplayCoctails() {
    const {coctails} = useAppCtx();

    if (coctails.length < 1) {
        return (
            <div> Lista jest pusta </div>
        );
    }

    return (
        <div className="coctails section">
            <div className="coctailWrapper">
                <div className="row">
                    {
                        coctails.map((coctail) => {
                                return (
                                    <Coctail  {...coctail} key={coctail.name}/>
                                )
                            }
                        )}
                </div>
            </div>
        </div>
    );
}

