import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";

function Home() {
    const [notes, setNotes] = useState([]);
    const [filteredNotes, setFilteredNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [subject, setSubject] = useState("");
    const [filterSubject, setFilterSubject] = useState(""); // Separate state for filter subject

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {setNotes(data); console.log(data) })
            .catch((err) => alert(err));
    };

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Note deleted!");
                else alert("Failed to delete note.");
                getNotes();
            })
            .catch((error) => alert(error));
    };

    const createNote = (e) => {
        e.preventDefault();
        api
            .post("/api/notes/", {content, title, subject})
            .then((res) => {
                if (res.status === 201) alert("Note created!");
                else alert("Failed to make note.");
                getNotes();
            })
            .catch((err) => alert(err));
    };

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        api
            .get(`/api/notes/subject/?subject=${filterSubject}`) // Use filterSubject for filtering
            .then((res) => {
                setFilteredNotes(res.data);
                if (res.data.length === 0) {
                    alert("No notes found with that subject");
                }
            })
            .catch((err) => alert(err));
    };

    return (
        <div>
            <h2>Notes</h2>
            <div className="note-wrapper">
                {notes.map((note) => (
                    <Note note={note} onDelete={deleteNote} key={note.id} />
                ))}
            </div>
            <h2>Make a Note</h2>
            <form onSubmit={createNote}>
                <label htmlFor="subject">Subject:</label>
                <br/>
                <input
                    type="text"
                    id="subject"
                    name="subject"
                    onChange={(e) => setSubject(e.target.value)}
                    value={subject}
                />
                <label htmlFor="title">Title:</label>
                <br/>
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <label htmlFor="content">Content:</label>
                <br/>
                <textarea
                    id="content"
                    name="content"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <br/>
                <input type="submit" value="Submit"></input>
            </form>
            <h2>Find a note</h2>
            <form className="filter-form" onSubmit={handleFilterSubmit}>
                <label htmlFor="filterSubject">Filter by Subject:</label>
                <br/>
                <input
                    type="text"
                    id="filterSubject"
                    value={filterSubject} // Use filterSubject for value and onChange
                    onChange={(e) => setFilterSubject(e.target.value)}
                />
                <br/>
                <button type="submit">Filter</button>
            </form>
            <div>
                <h2>Filtered Notes</h2>
                <div className="note-wrapper">
                    {filteredNotes.map((note) => (
                        <Note note={note} onDelete={deleteNote} key={note.id} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
