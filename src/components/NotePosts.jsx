import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import CreateNote from "./CreateNote";
import NoteEditor from "./NoteEditor";
import { addNewCategory, getCategoriesById } from "../database/categorieFolders";
import { getNotesById, updateNote } from "../database/notesPosts";
import { signOut } from "@firebase/auth";
import { auth } from "../database/firebaseConfig";
import { v4 as uuidv4 } from "uuid";

import './Noteposts.css'

const Notebook = ({ uid }) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedNote, setSelectedNote] = useState(null);
    const [notes, setNotes] = useState([]);
    const [showNoteEditor, setShowNoteEditor] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const categoryData = await getCategoriesById(uid);
            setCategories(categoryData);
        };
    
        fetchData();
    }, [uid]);
    
    useEffect(() => {
        const fetchData = async () => {
            const noteData = await getNotesById(uid);
            setNotes(noteData);
        };
    
        fetchData();
    }, [uid]);
    
    const onAddNewCategory = async () => {
        const newCategory = {
            id: uuidv4(),
            name: `Category `,
            uid: uid,
        };
        setCategories((prevCategories) => [...prevCategories, newCategory]);
        await addNewCategory(newCategory);
    };
    
    const handleSave = async (note) => {
        setNotes((prevNotes) =>
            prevNotes.map((item) => (item.id === note.id ? note : item))
        );
        setSelectedNote();
        await updateNote(note);
    };

const handleDelete = async (note) => {
    try {
        setNotes((prevNotes) => prevNotes.filter((item) => item.id !== note.id));
        setSelectedNote();
        console.log("Note deleted:", note.id);
    } catch (error) {
        console.error("Error deleting note:", error);
    }
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
                    setShowNoteEditor={setShowNoteEditor}
                    notes={notes}
                />
                <CreateNote
                    selectedCategory={selectedCategory}
                    selectedNote={selectedNote}
                    setSelectedNote={setSelectedNote}
                    notes={notes}
                    setNotes={setNotes}
                    uid={uid}
                    showNoteEditor={showNoteEditor}
                    setShowNoteEditor={setShowNoteEditor}
                />
                {selectedNote && (
                    <NoteEditor
                        selectedNote={selectedNote}
                        handleSave={handleSave}
                        handleDelete={handleDelete}
                    />
                )}
            </div>
            
        </>
    );
};

export default Notebook;