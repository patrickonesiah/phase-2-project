import React, { useState } from 'react';
import { useParams, useHistory, useLocation } from "react-router-dom";

function CreateEditStory() {

  /**Get location */
  let location = useLocation();

  const pathname = location.pathname.split('/')
  console.log(pathname[1])

  /* Initialize date and format to 1 Jan 2024*/
  const date = new Date();

  let day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' }).substring(0, 3);
  let year = date.getFullYear();

  let currentDate = `${day} ${month} ${year}`;

  const history = useHistory();

  /* Initialize story variable */
  const [storyTitle, setStoryTitle] = useState("My story title");

  const handleStoryTitle = (event) => {
    setStoryTitle(event.target.value)
  }

  /* Initialize child name */
  const [childDisplayName, setDisplayName] = useState("Child name");
  const [childFirstName, setChildFirstName] = useState("Child");
  const [childLastName, setChildLastName] = useState("name");

  const handleChildName = (event) => {
    const [childFirstName, childLastName] = event.target.value.split(' ')
    setChildFirstName(childFirstName)
    setChildLastName(childLastName)
    setDisplayName(event.target.value)
  }

  /* Initialize author name */
  const [authorDisplayName, setAuthorDisplayName] = useState("Phil Dunphy");
  const [authorFirstName, setAuthorFirstName] = useState("Phil");
  const [authorLastName, setAuthorLastName] = useState("Dunphy");

  const handleAuthorName = (event) => {
    const [authorFirstName, authorLastName] = event.target.value.split(' ')
    setAuthorFirstName(authorFirstName)
    setAuthorLastName(authorLastName)
    setAuthorDisplayName(event.target.value)
  }

  /* Initialize child order */
  const [childOrder, setChildOrder] = useState("first");

  const handleChildOrder = (event) => {
    setChildOrder(event.target.value)
  }

  /* Initialize image */
  const [mainImg, setMainImg] = useState("https://www.pallenz.co.nz/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png");

  function handleMainImg(e) {
    setMainImg(e.target.value)
  }

  /* Initialize story */
  const [story, setStory] = useState(
    "Write your story here..."
  );

  const handleStory = (event) => {
    setStory(event.target.value)
  }

  /* Initialize relationship */
  const [relationship, setRelationship] = useState("father");

  const handleRelationship = (event) => {
    setRelationship(event.target.value)
  }

  /* Handle form submission */
  function handleSubmit(e) {
    e.preventDefault();
    if (pathname[1] != "EditStory") {
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

              fetch("https://narrativegrovedb.onrender.com/stories", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(itemData),
              })
                .then((r) => r.json())
                .then((newItem) => {
                  history.push(`/DisplayStory/${newItem.id}`)
                  console.log(newItem)
                });
            }else{
              fetch(`https://narrativegrovedb.onrender.com/stories/${pathname[2]}`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  // storyTitle: newStoryTitle,
                  authorFirstName: authorFirstName,
                  authorLastName: authorLastName,
                  childFirstName: childFirstName,
                  childLastName: childLastName,
                  // storyDescription: newStory,
                  // birthOrder: newChildOrder,
                  // relationship: newRelationship,
                  // storyMainImage: newMainImg,
                }),
              })
                .then(r => r.json())
                .then(data => {
                  console.log(data)
                  history.push(`/DisplayStory/${data.id}`)
                })
            }
    }




    // function handleSave(e) {
    //   e.preventDefault();

    //   const [authorFirstName, authorLastName] = newAuthor.split(' ')
    //   const [childFirstName, childLastName] = newChildName.split(' ')

      
    // }

    return (
      <div className="App-create-a-story">
        {pathname[1] == "EditStory" ? <h1>Edit A Story</h1> : <h1>Create A Story</h1>}
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
        </form>
      </div>
    );
  }

  export default CreateEditStory;