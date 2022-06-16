import {useForm} from 'react-hook-form'
import {useAppCtx} from "../../../appContextProvider";

export default function AddComment({idCoctail}) {
    const {register, handleSubmit} = useForm();
    const {saveComments} = useAppCtx();
    const submit = (text, e) => {
        e.preventDefault();
        saveComments(text.text, parseInt(idCoctail), false)
    };

    return (
        <fieldset>
            <legend>Dodaj komentarz</legend>
            <form onSubmit={handleSubmit(submit)}>
                <textarea {...register('text')} rows="4" cols="50"/>
                <button
                    className="register"
                    type="submit"
                >
                    Wyślij
                </button>
            </form>
        </fieldset>);
}
