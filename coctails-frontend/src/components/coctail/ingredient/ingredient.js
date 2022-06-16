import React from "react";

export default function Ingredient({ amount, measurement, name }) {
    return (
        <li className="ingredient">
            {amount} {measurement} {name}
        </li>
    );
}
