import React from 'react';

function Top({childFirstName, childLastName, birthOrder, storyMainImage}) {

    return(
        <>
            <h2>{childFirstName} {childLastName} - {birthOrder} child</h2>
            <img className="App-story-image" src={storyMainImage} alt="Story" />
        </>
    )
}

export default Top;