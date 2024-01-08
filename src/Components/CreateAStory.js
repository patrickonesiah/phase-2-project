import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

function CreateAStory() {

  const date = new Date();
  
  let day = date.getDate();
  // let month = date.getMonth() + 1;
  const month = date.toLocaleString('default', { month: 'long' }).substring(0, 3);
  let year = date.getFullYear();
  // This arrangement can be altered based on how we want the date's format to appear.
  let currentDate = `${day} ${month} ${year}`;

  const history = useHistory();

  const [storyTitle, setStoryTitle] = useState("My story title");

  const handleStoryTitle = (event) => {
    setStoryTitle(event.target.value)
  }

  const [childDisplayName, setDisplayName] = useState("Child name");
  const [childFirstName, setChildFirstName] = useState("Child");
  const [childLastName, setChildLastName] = useState("name");

  const handleChildName = (event) => {
    const [childFirstName, childLastName] = event.target.value.split(' ')
    setChildFirstName(childFirstName)
    setChildLastName(childLastName)
    setDisplayName(event.target.value)
  }

  // const [writtenDate, setstoryTitle] = useState("");
  // const [numberOfLikes, setstoryTitle] = useState("");
  const [authorDisplayName, setAuthorDisplayName] = useState("Phil Dunphy");
  const [authorFirstName, setAuthorFirstName] = useState("Phil");
  const [authorLastName, setAuthorLastName] = useState("Dunphy");

  const handleAuthorName = (event) => {
    const [authorFirstName, authorLastName] = event.target.value.split(' ')
    setAuthorFirstName(authorFirstName)
    setAuthorLastName(authorLastName)
    setAuthorDisplayName(event.target.value)
  }

  const [childOrder, setChildOrder] = useState("first");
  
  const handleChildOrder = (event) => {
    setChildOrder(event.target.value)
  }
  const [mainImg, setMainImg] = useState("https://www.pallenz.co.nz/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png");

  function handleMainImg(e){
    setMainImg(e.target.value)
  }
  
  const [story, setStory] = useState(
    "Write your story here..."
  );

  const handleStory = (event) => {
    setStory(event.target.value)
  }
  const [relationship, setRelationship] = useState("father");

  const handleRelationship = (event) => {
    setRelationship(event.target.value)
  }
  
  // const [selectedImage, setSelectedImage] = useState();
  
  // const getImage = (event) => {
  //   setSelectedImage(event.target.files[0])
  // }

  function handleSubmit(e) {
    e.preventDefault();

    const itemData = {
      storyTitle: storyTitle,
      storyDescription: story,
      childFirstName: childFirstName,
      childLastName: childLastName,
      authorFirstName: authorFirstName,
      authorLastName: authorLastName,
      relationship: relationship,
      storyMainImage: mainImg,
      writtenDate: currentDate,
      numberOfLikes: 0,
      birthOrder: childOrder,
    };

    fetch("http://localhost:3001/stories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemData),
    })
      .then((r) => r.json())
      // call the onAddItem prop with the newItem
      .then((newItem) => {
        history.push(`/DisplayStory/${newItem.id}`)
        console.log(newItem)
      });
  }

  return (
    <div className="App-create-a-story">
      <h1>Create A Story</h1>
      <form className="Create-a-story-form" onSubmit={handleSubmit}>
        <div className="Create-a-story-title">
          <label className="Create-a-story-label" for={storyTitle}>Story title:</label>
          <input className="Create-a-story-input" name={storyTitle} value={storyTitle} onChange={handleStoryTitle} />
        </div>
        <div className="Create-a-story-author">
          <label className="Create-a-story-label" >Author:</label>
          <input className="Create-a-story-input" name={authorDisplayName} value={authorDisplayName} onChange={handleAuthorName} />
        </div>
        <div className="Create-a-story-childname">
          <label className="Create-a-story-label">Child name:</label>
          <input className="Create-a-story-input" name={childDisplayName} value={childDisplayName} onChange={handleChildName} />
        </div>
        <div className="Create-a-story-mainImage">
          <label className="Create-a-story-label">Story main image:</label>
          <input className="Create-a-story-input" name={mainImg} value={mainImg} onChange={handleMainImg} />
        </div>
        <textarea className="Create-a-story-text-area" value={story} onChange={handleStory} />
        <div className="Create-a-story-childNumber">
          <label className="Create-a-story-label">Child no:</label>
          <select className="Create-a-story-input" value={childOrder} onChange={handleChildOrder}>
            <option value="first">First</option>
            <option value="second">Second</option>
            <option value="third">Third</option>
            <option value="fourth">Fourth</option>
            <option value="fifth">Fifth</option>
            <option value="sixth">Sixth</option>
            <option value="seventh">Seventh</option>
            <option value="eighth">Eighth</option>
            <option value="ninth">Ninth</option>
            <option value="tenth">Tenth</option>
          </select>
        </div>
        <div className="Create-a-story-relationship">
          <label className="Create-a-story-label">Relationship:</label>
          <select className="Create-a-story-input" value={relationship} onChange={handleRelationship}>
            <option value="father">Father</option>
            <option value="mother">Mother</option>
          </select>
        </div>
        <button className="Create-a-story-submit">Submit</button>
        {/* <input
          type="file"
          name="myImage"
          onChange={getImage}
        /> */}
      </form>
    </div>
  );
}

export default CreateAStory;