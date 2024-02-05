import React from 'react';
import Like from '../Like'

function Bottom({
    authorFirstName, 
    authorLastName, 
    writtenDate, 
    numberOfLikes,
    handleDelete,
    id
}) {

    return(
        <>
            <span className="authorName">Shared by {authorFirstName} {authorLastName}</span>
            <span className="writtenDate">{writtenDate}</span>
            <Like id={id} numberOfLikes={numberOfLikes} />
            <img className="deleteButton" onClick={handleDelete} src="./images/bin.png" alt="Delete" width="30" />
        </>
    )
}

export default Bottom;