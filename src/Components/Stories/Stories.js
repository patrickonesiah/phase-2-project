import React, { useState, useEffect } from 'react';
import Story from './Story'
import { Link } from "react-router-dom";

function Stories() {
  const [stories, setStories] = useState([]);

  const fetchResources = async () => {
    const storiesResponse = await fetch("https://narrativegrovedb.onrender.com/stories")
    const stories = await storiesResponse.json()
    setStories(stories)
  }

  useEffect(() => {
    fetchResources();
  }, []);

  function handleDeleteStories(id) {

    const updatedStoriesArray = stories.filter(
      (story) => {
        console.log("story: ", story.id,id)
        return story.id !== id
      }
    );
    setStories(updatedStoriesArray);
  }

  const storiesCards = stories.map((storyObj) => (
    <Story
      key={storyObj.id}
      story={storyObj}
      onDeleteStories={handleDeleteStories}
    />
  ));

  return (
    <div className="App-stories">
      <Link to="/CreateAStory" className="App-story">
        <div className="App-story-create-container">
          <img className="App-story-img" src="./images/journal.png" alt="Journal icon" />
          <div className="App-story-img-cta">Create A Story</div>
        </div>
      </Link>
      {storiesCards}
    </div>
  );
}

export default Stories;