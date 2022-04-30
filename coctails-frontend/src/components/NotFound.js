import React from 'react';
import {Link} from 'react-router-dom';

export default function NotFound() {
    return (
        <div>
            <h1>404 - Not Found!</h1>
            <Link to="/">Powrót do głównej strony</Link>
        </div>
    );
}
