import React from "react";

export default function Instructions({steps }) {
    return (
        <div className="instructionsContainer">
            <h3>Sposób przygotowania</h3>
            {steps.map((s, i) => (
                <p key={i}>{s}</p>
            ))}
        </div>
    );
}