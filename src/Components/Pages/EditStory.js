import React, { useEffect, useState } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";

function EditStory() {
    const [project, setProject] = useState([]);
    const [newStoryTitle, setNewStoryTitle] = useState("")
    const [newAuthor, setNewAuthor] = useState("")
    const [newChildName, setNewChildName] = useState("")
    const [newStory, setNewStory] = useState("")
    const [newChildOrder, setNewChildOrder] = useState("")
    const [newRelationship, setNewRelationship] = useState("")
    const [newMainImg, setNewMainImg] = useState("")
    const { id } = useParams()
    const history = useHistory();
    const location = useLocation();

    console.log(location.hash)

    const updateData = () => {
        fetch(`https://narrativegrovedb.onrender.com/stories/${id}`)
            .then(r => r.json())
            .then(data => {
                setProject(data)
    
                setNewStoryTitle(data.storyTitle)
    
                const oldAuthor = data.authorFirstName.concat(' ', data.authorLastName)
                setNewAuthor(oldAuthor)
    
                const oldChildName = data.childFirstName.concat(' ', data.childLastName)
                setNewChildName(oldChildName)
    
                setNewStory(data.storyDescription)
                setNewChildOrder(data.birthOrder)
                setNewRelationship(data.relationship)
                setNewMainImg(data.storyMainImage)
            })

    }

    useEffect(() => {
        updateData()
    },[])




    if (!project) return <h2>Loading...</h2>

    function handleStoryTitle(e) {
        setNewStoryTitle(e.target.value)
    }

    function handleAuthor(e) {
        setNewAuthor(e.target.value)
    }

    function handleChildName(e) {
        setNewChildName(e.target.value)
    }

    function handleStory(e) {
        setNewStory(e.target.value)
    }

    function handleChildOrder(e) {
        setNewChildOrder(e.target.value)
    }

    function handleRelationship(e) {
        setNewRelationship(e.target.value)
    }
    function handleNewImg(e) {
        setNewMainImg(e.target.value)
    }

    function handleSave(e) {
        e.preventDefault();

        const [authorFirstName, authorLastName] = newAuthor.split(' ')
        const [childFirstName, childLastName] = newChildName.split(' ')

        fetch(`https://narrativegrovedb.onrender.com/stories/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                storyTitle: newStoryTitle,
                authorFirstName: authorFirstName,
                authorLastName: authorLastName,
                childFirstName: childFirstName,
                childLastName: childLastName,
                storyDescription: newStory,
                birthOrder: newChildOrder,
                relationship: newRelationship,
                storyMainImage: newMainImg,
            }),
        })
            .then(r => r.json())
            .then(data => {
                console.log(data)
                history.push(`/DisplayStory/${data.id}`)
            })
    }

    return (
        <div className="App-create-a-story">
            <h1>Edit Story</h1>
            <form className="Create-a-story-form" onSubmit={handleSave}>
                <div className="Create-a-story-title">
                    <label className="Create-a-story-label" for={newStoryTitle}>Story title:</label>
                    <input className="Create-a-story-input" name={newStoryTitle} value={newStoryTitle} onChange={handleStoryTitle} />
                </div>
                <div className="Create-a-story-author">
                    <label className="Create-a-story-label" for={newAuthor}>Author:</label>
                    <input className="Create-a-story-input" name={newAuthor} value={newAuthor} onChange={handleAuthor} />
                </div>
                <div className="Create-a-story-childname">
                    <label className="Create-a-story-label" for={newChildName}>Child name:</label>
                    <input className="Create-a-story-input" name={newChildName} value={newChildName} onChange={handleChildName} />
                </div>
                <div className="Create-a-story-mainImage">
                    <label className="Create-a-story-label">Story main image:</label>
                    <input className="Create-a-story-input" name={newMainImg} value={newMainImg} onChange={handleNewImg} />
                </div>
                <textarea className="Create-a-story-text-area" name={newStory} value={newStory} onChange={handleStory} />
                <div className="Create-a-story-childNumber">
                    <label className="Create-a-story-label" for={newChildOrder}>Child no:</label>
                    <select className="Create-a-story-input" name={newChildOrder} value={newChildOrder} onChange={handleChildOrder}>
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
                    <label className="Create-a-story-label" for={newRelationship}>Relationship:</label>
                    <select className="Create-a-story-input" name={newRelationship} value={newRelationship} onChange={handleRelationship}>
                        <option value="father">Father</option>
                        <option value="mother">Mother</option>
                    </select>
                </div>
                <button className="Create-a-story-submit">Save</button>
            </form>
        </div>
    );
}

export default EditStory;