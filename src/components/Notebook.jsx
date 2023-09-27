import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import NewNote from "./NewNote";
import NoteEditor from "./NoteEditor";
import { addNewCategory, getCategoriesById } from "../database/categorieFolders";
import { getNotesById, updateNote } from "../database/notes";
import { signOut } from "@firebase/auth";
import { auth } from "../database/firebase";
import { v4 as uuidv4 } from "uuid";
import './Notebook.css'

const Notebook = ({ uid }) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedNote, setSelectedNote] = useState(null);
    const [notes, setNotes] = useState([]);
    const [showNoteForm, setShowNoteForm] = useState(false);

    useEffect(() => {
        getCategoriesById(uid).then((data) => {
            setCategories(data);
        });
    }, [uid]);

    useEffect(() => {
        getNotesById(uid).then((data) => {
            setNotes(data);
        });
    }, [uid]);

 
    const onAddNewCategory = async () => {
        const newCategory = {
            id: uuidv4(),
            name: `Category `,
            uid: uid,
        };
        setCategories([...categories, newCategory]);
        await addNewCategory(newCategory);
       
    };

    const handleSave = async (note) => {
        setNotes((prev) => prev.map((item) => (item.id === note.id ? note : item)));
        setSelectedNote();
        await updateNote(note);
    };

    const handleDelete = (note) => {
        setNotes((prev) => prev.filter((item) => item.id !== note.id));
        setSelectedNote();
    };

    const handleCancel = () => {
        setSelectedNote(null);
    };

    return (
        <>
            <div className="header">
                <h6 className="head-6">Your Notes</h6>
                
                <button className="logout m-1" onClick={() => {
                        signOut(auth);
                    }}
                >X</button>
            </div>
 
            <div className="d-flex flex-row gap-1">
                <Sidebar
                    categories={categories}
                    onAddNewCategory={onAddNewCategory}
                    setSelectedCategory={setSelectedCategory}
                    selectedCategory={selectedCategory}
                    setSelectedNote={setSelectedNote}
                    setShowNoteForm={setShowNoteForm}
                    notes={notes}
                />
                <NewNote
                    selectedCategory={selectedCategory}
                    selectedNote={selectedNote}
                    setSelectedNote={setSelectedNote}
                    notes={notes}
                    setNotes={setNotes}
                    uid={uid}
                    showNoteForm={showNoteForm}
                    setShowNoteForm={setShowNoteForm}
                />
                {selectedNote && (
                    <NoteEditor
                        selectedNote={selectedNote}
                        handleSave={handleSave}
                        handleDelete={handleDelete}
                        handleCancel={handleCancel}
                    />
                )}
            </div>
            
        </>
    );
};

export default Notebook;