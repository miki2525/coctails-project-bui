import React from "react";

export default function Comments({comments}) {
    if (comments.length < 1){
       return (
           <div className="commentsContainer">
               <h3>Komentarze</h3>
               <p>Brak komentarzy!</p>
           </div>
       )
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
                .map((comment,i) => (
                    <div key={i}>
                        <div className="date">{comment.date}</div>
                        <p className="text">{comment.content}</p>
                    </div>
                ))}
        </div>
    );
}