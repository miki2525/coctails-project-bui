import React from "react";
import {useForm} from 'react-hook-form';
import {useAppCtx} from "../../appContextProvider";
import {Navigate} from "react-router-dom";
import '../../styles/adminPanel/adminForm.scss'

export default function AdminLogin() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {authenticated_AdminRole, setAuthenticated_AdminRole} = useAppCtx();
    if (authenticated_AdminRole){
        return (<Navigate to="/"/>)
    }


    const submit = (credentials) => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(credentials)
        };
        fetch('/adminLogin', requestOptions)
            .then(response => response.json()
                .then(data => {
                    let errorField = document.getElementById("errorFieldAdmin");
                    if (data) {
                        errorField.innerText = '';
                        setAuthenticated_AdminRole(data);
                    } else {
                        errorField.innerText = "Złe dane logowania";
                    }
                }))
    };

    return (
        <fieldset className="adminForm">
            <legend>Formularz logowania</legend>
            <form onSubmit={handleSubmit(submit)}>
                <input {...register('login')} type="text" placeholder="Login" required/>
                <div className="error">{errors.login?.message}</div>
                <input {...register('password')} type="password" placeholder="Hasło" required/>
                <div className="error">{errors.password?.message}</div>
                <button className="zalAdmin" value="Zaloguj">Zaloguj</button>
                <button className="resAdmin" value="Reset" type="reset">Reset</button>
                <div id="errorFieldAdmin"/>
            </form>
        </fieldset>
    );

}