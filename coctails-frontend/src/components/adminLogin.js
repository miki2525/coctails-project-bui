import React from "react";
import {useForm} from 'react-hook-form';


export default function AdminLogin() {
    const {register, handleSubmit, formState: {errors}} = useForm();

    const submit = (credentials) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        };
        fetch('/adminLogin', requestOptions)
            .then(response => response.json()
                .then(data => alert(data.toString())))
    };

    return (
        <fieldset>
            <legend>Formularz logowania</legend>
            <form onSubmit={handleSubmit(submit)}>
                <input {...register('login')} type="text" placeholder="Login" required/>
                <div className="error">{errors.login?.message}</div>
                <input {...register('password')} type="password" placeholder="Hasło" required/>
                <div className="error">{errors.password?.message}</div>
                <button value="Zaloguj">Zaloguj</button>
                <button value="Reset" type="reset">Reset</button>
            </form>
            <label>* login: admin pass: admin *</label>
        </fieldset>
    );

}