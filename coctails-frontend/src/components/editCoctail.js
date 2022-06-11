import React, {useEffect, useState} from 'react';
import {useAppCtx} from "../appContextProvider";
import {Navigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";

export default function EditCoctail() {
    const {getCoctailDetails, getComments, authenticated_AdminRole, saveCoctails} = useAppCtx();
    const {id} = useParams();
    const {register, handleSubmit} = useForm();
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        if (thisCoctail !== undefined) {
            setIngredients([...thisCoctail.ingredients])
        }
    }, []);

    if (!authenticated_AdminRole) {
        return (<Navigate to="/404"/>)
    }

    const thisCoctail = getCoctailDetails(parseInt(id));




    if (thisCoctail === undefined) {
        return (<Navigate to="/404"/>)
    }


    const thisComments = getComments(parseInt(id));


    const addElement = () => {
        const addedIndex = [...ingredients];
        addedIndex.push({
            name: "",
            amount: "",
            measurement: ""
        })
        setIngredients(addedIndex);
    }

    // const deleteElement = (index) => {
    //     const deletedIndex = ingredients.filter(
    //         (ingr, thisIndex) => thisIndex !== index
    //     );
    //     setIngredients(deletedIndex);
    // }

    const submit = (data, e) => {
        e.preventDefault();
        data.id = parseInt(id);
        saveCoctails(data, true)
    };

    return (
        <div className="Coctaileditor">
            <fieldset>
                <legend>Eydcja Koktajlu</legend>
                <form onSubmit={handleSubmit(submit)}>
                    <div>Nazwa <input type="text" {...register('name')} defaultValue={thisCoctail.name} required/></div>
                    <div>Typ <select {...register('type')} defaultValue={thisCoctail.type} required>
                        <option disabled defaultValue={thisCoctail.type} selected/>
                        <option defaultValue="Alkoholowy">Alkoholowy</option>
                        <option defaultValue="Bezalkoholowy">Bezalkoholowy</option>
                    </select></div>
                    <div>Szkło <input type="text" {...register('glass')} defaultValue={thisCoctail.glass} required/>
                    </div>
                    <div>Składniki
                        {ingredients.map((ingredient, index) => {
                            return (<div key={index}>
                                <input
                                    type="text" {...register('nameIngr' + index)}
                                    defaultValue={ingredient.name}/>
                                <input
                                    type="text" {...register('amount' + index)}
                                    defaultValue={ingredient.amount}/>
                                <input
                                    type="text" {...register('measurement' + index)}
                                    defaultValue={ingredient.measurement}/>
                                {/*<button type="button" className="btn btn-secondary" onClick={() => deleteElement/(index)}>USUN</button>*/}
                            </div>);
                        })}
                        <button type="button" className="btn btn-info" onClick={() => addElement()}>DODAJ SKŁADNIK
                        </button>
                    </div>
                    <textarea {...register('steps')} rows="6" cols="75" required
                              defaultValue={thisCoctail.steps.join('')}/>
                    <button
                        className="register"
                        type="submit"
                    >
                        Wyślij
                    </button>
                </form>
            </fieldset>
        </div>
    );
}