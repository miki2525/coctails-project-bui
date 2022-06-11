import React, {createContext, useState, useContext, useEffect} from 'react';
import coctailsData from './data/coctails.json';
import commentsData from './data/comments.json';

const AppContext = createContext();
export const useAppCtx = () => useContext(AppContext);

export default function AppContextProvider({children}) {
    const [coctails, setCoctails] = useState(coctailsData); //reset to ''
    const [comments, setComments] = useState(commentsData); //reset
    const [coctailsSearch, setCoctailsSearch] = useState(coctailsData); //reset
    const [loading, setLoading] = useState(false); //set to true
    const [authenticated_AdminRole, setAuthenticated_AdminRole] = useState(false);

    useEffect(() => {
        fetch("/api/getData")
            .then(res => res.json())
            .then(data => {
                setCoctails(data.coctails);
                setComments(data.comments);
                setCoctailsSearch(data.coctails);
                setLoading(false);
            })
    }, []);

    const resetCoctails = () => {
        fetch("/api/getData")
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setCoctails(data.coctails)
            });
    }

    const saveCoctails = (coctailToSave, update) => {
        if (update) {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(coctailToSave)
            };
            fetch('/coctails/updateCoctail', requestOptions)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        console.log(response.statusText)
                    }
                })
                .then(data => {
                    if (data) {
                        setCoctails(data)
                        window.location.href = "http://localhost:3001/coctail/" + coctailToSave.id;
                    } else {
                        console.log("SERVER ERROR - updateCoctail()");
                    }
                })
        }
        //save(create)
        else {
            // headers: {'Content-Type': 'multipart/form-data'},
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(coctailToSave)
            };

            fetch('/coctails/createCoctail', requestOptions)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        console.log(response.statusText)
                    }
                })
                .then(data => {
                    if (data) {
                        setCoctails(data)
                        window.location.href = "http://localhost:3001/";
                    } else {
                        console.log("SERVER ERROR - saveCoctail()");
                    }
                })
        }
    }

    const saveComments = (content, idCoctail, update) => {
        const commentToSend = {content: content, idCoctail: idCoctail};
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(commentToSend)
        };
        //update
        if (update) {
            // setComments(commentsToSave)
        }
        //save
        else {
            fetch('/comments/saveComment', requestOptions)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        console.log(response.statusText)
                    }
                })
                .then(data => {
                    if (data) {
                        setComments(data)
                        window.location.reload();
                    } else {
                        console.log("SERVER ERROR - saveComment()");
                    }
                })
        }
    }

    const deleteCoctail = (id) =>{
        if(window.confirm("Czy napewno chcesz usunąć ten koktajl")){
            const idToSend = {id: id};
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(idToSend)
            };
            fetch('/coctails/deleteCoctail', requestOptions)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        console.log(response.statusText)
                    }
                })
                .then(data => {
                    if (data) {
                        window.alert("USUNIĘTO");
                        setCoctails(data)
                        window.location.href = "http://localhost:3001/";
                    } else {
                        console.log("SERVER ERROR - deleteCoctail()");
                    }
                })
        }
        else {
            console.log("ANULOWANO USUNIĘCIE KOKTAJLU id:" + id)
        }
    }

    const deleteComment = (id) =>{
        if(window.confirm("Czy napewno chcesz usunąć ten komentarz")){
            const idToSend = {id: id};
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(idToSend)
            };
            fetch('/comments/deleteComment', requestOptions)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        console.log(response.statusText)
                    }
                })
                .then(data => {
                    if (data) {
                        window.alert("USUNIĘTO");
                        setComments(data)
                        window.location.reload();
                    } else {
                        console.log("SERVER ERROR - deleteComment()");
                    }
                })
        }
        else {
            console.log("ANULOWANO USUNIĘCIE KOMENTARZA id:" + id)
        }
    }

    const rateIt = (id, rate) => {
        const rateToSend = {idCoctail: id, rate: rate};
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(rateToSend)
        };
        fetch('/coctails/rateCoctail', requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.log(response.statusText)
                }
            })
            .then(data => {
                if (data) {
                    setCoctails(data)
                    window.location.reload();
                } else {
                    console.log("SERVER ERROR - rateCoctail()");
                }
            })
    }

    const getCoctailDetails = (id) => {
        return coctails.find((coctail) => coctail.id === id);
    }

    const getComments = (id) => {
        return comments.filter((comment) => comment.id_coctail === id);
    }


    return (
        <AppContext.Provider
            value={{
                coctails,
                coctailsSearch,
                setCoctails,
                resetCoctails,
                comments,
                loading,
                setComments,
                saveCoctails,
                saveComments,
                deleteCoctail,
                deleteComment,
                rateIt,
                getCoctailDetails,
                getComments,
                authenticated_AdminRole,
                setAuthenticated_AdminRole
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
