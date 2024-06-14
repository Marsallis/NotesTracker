import React from "react";
import "../styles/Note.css"
import { useState } from "react";

function Note({ note, onDelete, onUpdate }) {
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US");
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState(note.title);
    const [updatedContent, setUpdatedContent] = useState(note.content);
    const [updatedSubject, setUpdatedSubject] = useState(note.subject);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleUpdate = () => {
        onUpdate(note.id, updatedTitle, updatedContent, updatedSubject);
        setIsEditing(false);
    };

    return (
        <div className="note-container">
            {isEditing ? (
                <>
                    <input 
                        type="text" 
                        value={updatedSubject} 
                        onChange={(e) => setUpdatedSubject(e.target.value)} 
                    />
                    <input 
                        type="text" 
                        value={updatedTitle} 
                        onChange={(e) => setUpdatedTitle(e.target.value)} 
                    />
                    <textarea 
                        value={updatedContent} 
                        onChange={(e) => setUpdatedContent(e.target.value)} 
                    />
                    <button onClick={handleUpdate}>Save</button>
                </>
            ) : (
                <>
                    <p className="note-subject">{note.subject}</p>
                    <p className="note-title">{note.title}</p>
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
