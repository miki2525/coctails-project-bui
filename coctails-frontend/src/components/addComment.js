import {useForm} from 'react-hook-form'

export default function AddComment({comments}) {
    const {register, handleSubmit} = useForm();
    const submit = (data) => {
        console.log(data);
    };

    return (
        <fieldset>
            <legend>Dodaj komentarz</legend>
            <form onSubmit={handleSubmit(submit)}>
                <textarea {...register('text')} rows="4" cols="50"></textarea>
                <button
                    className="register"
                    type="submit"
                >
                    Wyślij
                </button>
            </form>
        </fieldset>);
}
