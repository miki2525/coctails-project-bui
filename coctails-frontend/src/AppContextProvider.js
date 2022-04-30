import React, {createContext, useState, useContext, useEffect} from 'react';
import coctailsData from './data/coctails.json';
import commentsData from './data/comments.json';

const appContext = createContext();
export const getAppCtx = () => useContext(appContext);

export default function AppContextProvider({children}) {
    const [coctails, setCoctails] = useState({});
    const [comments, setComments] = useState({});

    useEffect(() => {
        setCoctails(coctailsData);
        setComments(commentsData)
    }, []);

    const save = (coctailsToSave, commentsToSave) => {
        setCoctails(coctailsToSave);
        setComments(commentsToSave)
        ////call API + ovveride coctails,json + comments.json
    }

    return (
        <FormContext.Provider
            value={{coctails, setCoctails, comments, setComments, save}}
        >
            {children}
        </FormContext.Provider>
    );
}
