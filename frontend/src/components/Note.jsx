import React from "react";
import "../styles/Note.css"
import { useState } from "react";

function Note({ note, onDelete, onUpdate }) {
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US");
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState(note.title);
    const [updatedContent, setUpdatedContent] = useState(note.content);
    const [updatedSubject, setUpdatedSubject] = useState(note.subject);
    const [updatedImage, setUpdatedImage] = useState(note.image || '');

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleUpdate = () => {
        onUpdate(note.id, updatedTitle, updatedContent, updatedSubject, updatedImage);
        setIsEditing(false);
    };

    const noteContainerClass = note.image ? "note-container with-image" : "note-container";

    return (
        <div className={noteContainerClass}>
            {isEditing ? (
                <div className="edit-form">
                    <div className="edit-field">
                        <label htmlFor={`subject-${note.id}`}>Subject:</label>
                        <input
                            id={`subject-${note.id}`}
                            type="text"
                            value={updatedSubject}
                            onChange={(e) => setUpdatedSubject(e.target.value)}
                        />
                    </div>
                    <div className="edit-field">
                        <label htmlFor={`title-${note.id}`}>Title:</label>
                        <input
                            id={`title-${note.id}`}
                            type="text"
                            value={updatedTitle}
                            onChange={(e) => setUpdatedTitle(e.target.value)}
                        />
                    </div>
                    <div className="edit-field">
                        <label htmlFor={`content-${note.id}`}>Content:</label>
                        <textarea
                            id={`content-${note.id}`}
                            value={updatedContent}
                            onChange={(e) => setUpdatedContent(e.target.value)}
                        />
                    </div>
                    <div className="edit-field">
                        <label htmlFOr={`Image-${note.id}`}>Image URL</label>
                        <input
                            id={`image-${note.id}`}
                            type="text"
                            value={updatedImage}
                            onChange={(e) => setUpdatedImage(e.target.value)}
                        />
                    </div>
                    <button className="save-button" onClick={handleUpdate}>Save</button>
                </div>
            ) : (
                <>
                    <p className="note-subject">{note.subject}</p>
                    <p className="note-title">{note.title}</p>
                    {note.image && <img src={note.image} alt="Note" className="note-image" />}
                    <p className="note-content">{note.content}</p>
                    <p className="note-date">{formattedDate}</p>
                    <button className="edit-button" onClick={handleEdit}>Edit</button>
                </>
            )}
            <button className="delete-button" onClick={() => onDelete(note.id)}>
                Delete
            </button>
        </div>
    );
}

export default Note;
