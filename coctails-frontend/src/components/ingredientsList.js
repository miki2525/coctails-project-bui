import React from "react";
import Ingredient from "./ingredient";
import '../styles/ingredients.scss'

export default function IngredientsList({list}) {
    return (
        <div className="ingredientsContainer">
            <h3>Składniki</h3>
            <ul className="ingredients">
                {list.map((ingredient, i) => (
                    <Ingredient key={i} {...ingredient} />
                ))}
            </ul>
        </div>
    );
}
