import React from "react";
import {Trash2} from "react-bootstrap-icons";
import {useAppCtx} from "../appContextProvider";

export default function Comments({comments}) {
    const {authenticated_AdminRole, deleteComment} = useAppCtx();
    if (comments.length < 1) {
        return (
            <div className="commentsContainer">
                <h3>Komentarze</h3>
                <p>Brak komentarzy!</p>
            </div>
        )
    }
    const handleDelete = (id) => {
        deleteComment(parseInt(id));
    }

    return (
        <div className="commentsContainer">
            <h3>Komentarze</h3>
            {comments.sort((a, b) => {
                const [dayA, monthA, yearA] = a.date.split('-');
                const [dayB, monthB, yearB] = b.date.split('-');
                const dateA = new Date(+yearA, monthA - 1, +dayA);
                const dateB = new Date(+yearB, monthB - 1, +dayB);
                return dateB - dateA;
            })
                .map((comment, i) => (
                    <div key={i}>
                        <div className="date">{comment.date}{authenticated_AdminRole && (
                            <button onClick={() => handleDelete(comment.id)}><Trash2 size={8}/></button>)}</div>
                        <p className="text">{comment.content}</p>
                    </div>
                ))}
        </div>
    );
}