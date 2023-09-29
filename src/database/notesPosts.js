

import { db } from "./firebaseConfig";
import { collection, doc, addDoc, getDoc, updateDoc, deleteDoc, getDocs, query, where, } from "firebase/firestore";


const notesCollection = collection(db, "notes");

//Some functions for CRUD operations and to retrieve notes based on specified criteria

export const getNotesWithId = async () => {
  try {
    const querySnapshot = await getDocs(notesCollection);
    return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    console.error('Error getting notes', error);
    throw new Error('Failed to fetch notes.');
  }
};

export const addNote = async (note) => {
  console.log("Adding note:", note);
  
  try {
    const newNoteRef = await addDoc(notesCollection, note);
    console.log("Note added  ", newNoteRef);
  } catch (error) {
    console.error("Error adding note:", error);
  }
};

export const deleteNote = async (id) => {
  console.log("Deleting note", id);
  
  try {
    await deleteDoc(doc(notesCollection, id));
    console.log("Note deleted successfully.");
  } catch (error) {
    console.error("Error deleting note:", error);
  }
};

export const updateNote = async (note) => {
  const { id, ...noteData } = note;

  try {
    const noteRef = doc(notesCollection, id);
    const noteDoc = await getDoc(noteRef);

    if (noteDoc.exists()) {
      await updateDoc(noteRef, noteData);
      console.log("Note updated successfully:", id);
    } else {
      console.error("The note does not exist", id);
    }
  } catch (error) {
    console.error("Error updating note", error);
  }
};

export const getAllNotes = async () => {
  try {
    const querySnapshot = await getDocs(notesCollection);
    const notes = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    return notes;
  } catch (error) {
    console.error("Error getting all notes:", error);
    return [];
  }
};

export const getNotesById = async (uid) => {
  try {
    const qry = query(notesCollection, where("uid", "==", uid));
    const querySnapshot = await getDocs(qry);
    
    const notes = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });

    return notes;
  } catch (error) {
    console.error("Error getting notes", error);
    throw new Error("Failed to retrieve notes");
  }
};