import React from 'react';
import { Link } from "react-router-dom";
import Top from './TopStorySection';
import Middle from './MiddleStorySection';
import Bottom from './BottomStorySection';

function Story({ story, onDeleteStories }) {

    const { 
        id, 
        storyTitle, 
        storyDescription, 
        childFirstName, 
        childLastName, 
        authorFirstName,
        authorLastName,
        writtenDate, 
        numberOfLikes, 
        birthOrder, 
        storyMainImage 
    } = story;

    function handleDelete() {
        if (window.confirm("Are you sure you want to delete?")) {
            // const storiesResponse = await fetch(`https://narrativegrovedb.onrender.com/stories/${id}`, { method: "DELETE" })
            fetch(`https://narrativegrovedb.onrender.com/stories/${id}`, { method: "DELETE" })
            // const stories = await storiesResponse.json()
            onDeleteStories(id)
            console.log(`Delete =${id}`)
        }
    }

    return (
        <div className="App-story">
            <Link to={`/DisplayStory/${id}`}>
                <div className="App-story-top">
                    {/* <h2>{childFirstName} {childLastName} - {birthOrder} child</h2>
                    <img className="App-story-image" src={storyMainImage} alt="Story" /> */}
                    <Top 
                        childFirstName={childFirstName} 
                        childLastName={childLastName} 
                        birthOrder={birthOrder}
                        storyMainImage={storyMainImage}
                    />
                    <Middle
                        storyTitle={storyTitle}
                        storyDescription={storyDescription}
                    />

                </div>
            </Link>

            <div className="App-story-bottom">
                <Bottom 
                    authorFirstName={authorFirstName}
                    authorLastName={authorLastName}
                    writtenDate={writtenDate}
                    numberOfLikes={numberOfLikes}
                    id={id}
                    handleDelete={handleDelete}
                />

                {/* <span className="authorName">Shared by {authorFirstName} {authorLastName}</span>
                <span className="writtenDate">{writtenDate}</span>
                <Like id={id} numberOfLikes={numberOfLikes} />
                <img className="deleteButton" onClick={handleDelete} src="./images/bin.png" alt="Delete" width="30" /> */}
            </div>
        </div>
    );
}

export default Story;