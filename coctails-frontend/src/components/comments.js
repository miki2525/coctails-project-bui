import React from "react";

export default function Comments({comments}) {
    return (
        <div className="commentsContainer">
            <h3>Komentarze</h3>
            {comments.sort((a, b) => {
                return a.date.localeCompare(b.date)
            })
                .map((comment, i) => (
                    <div>
                        <div key={i} className="date">{comment.date}</div>
                        <p key={i} className="text">{comment.content}</p>
                    </div>
                ))}
        </div>
    );
}