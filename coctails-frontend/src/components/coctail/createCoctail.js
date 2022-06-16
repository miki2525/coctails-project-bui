import React, {useState} from 'react';
import {useAppCtx} from "../../appContextProvider";
import {useForm} from "react-hook-form";
import {Navigate} from "react-router-dom";
import {PlusSquareDotted} from "react-bootstrap-icons";
import {ingredientsNotEmpty} from "../../utils/coctailValidator";
import '../../styles/coctail/coctailForm.scss'

export default function CreateCoctail() {
    const {authenticated_AdminRole, saveCoctails} = useAppCtx();
    const {register, handleSubmit} = useForm();
    const [ingredients, setIngredients] = useState([{
        name: "",
        amount: "",
        measurement: ""
    }]);

    if (!authenticated_AdminRole) {
        return (<Navigate to="/404"/>)
    }

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
        let errorIngr = document.getElementById("errorIngr");
        if (!ingredientsNotEmpty(data)) {
            errorIngr.innerText = "Musi być choć jedna nazwa składnika";
            return;
        }
        errorIngr.innerText = "";
        saveCoctails(data, false)
    };

    return (
        <div className="coctailForm">
            <fieldset>
                <legend>Kreator Koktajlu</legend>
                <form onSubmit={handleSubmit(submit)}>
                    <div>Nazwa <input type="text" {...register('name')} placeholder="Nazwa koktajlu" required/></div>
                    <div><input type="file" {...register("file")} accept='image/*'/></div>
                    <div>Typ <select {...register('type')} placeholder="Typ" required>
                        <option disabled selected/>
                        <option defaultValue="Alkoholowy">Alkoholowy</option>
                        <option defaultValue="Bezalkoholowy">Bezalkoholowy</option>
                    </select></div>
                    <div>Szkło <input type="text" {...register('glass')} placeholder="Rodzaj szkła" required/>
                    </div>
                    <div>Składniki
                        {ingredients.map((ingredient, index) => {
                            return (<div key={index}>
                                <input
                                    type="text" className="ingr" {...register('nameIngr' + index)}
                                    placeholder="Nazwa składnika"/>
                                <input
                                    type="text" className="ingr" {...register('amount' + index)}
                                    placeholder="Ilość"/>
                                <input
                                    type="text" className="ingr" {...register('measurement' + index)}
                                    placeholder="Miara"/>
                                {/*<button type="button" className="btn btn-secondary"*/}
                                {/*        onClick={() => deleteElement(index)}>USUN*/}
                                {/*</button>*/}
                            </div>);
                        })}
                        <div id="errorIngr"/>
                        <button type="button" className="btn btn-info" onClick={() => addElement()}><PlusSquareDotted
                            size={20}/> DODAJ SKŁADNIK
                        </button>
                    </div>
                    <div>
                    <textarea {...register('steps')} rows="6" cols="75" required
                              placeholder="Intrukcja przyrządzenia"/>
                    </div>
                    <div>
                        <button
                            className="register btn btn-success"
                            type="submit">
                            Stwórz koktajl
                        </button>
                    </div>
                </form>
            </fieldset>
        </div>
    );
}