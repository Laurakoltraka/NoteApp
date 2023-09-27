import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { addNote } from "../database/notes";
import { PlusOutlined, SearchOutlined , CheckOutlined} from "@ant-design/icons";
import { Input } from "antd";

import "./Newnote.css";

const NewNote = ({
  selectedCategory,
  setSelectedNote,
  selectedNote,
  notes,
  setNotes,
  uid,
  setShowNoteForm,
  showNoteForm,
}) => {
  const [newNote, setNewNote] = useState({
    title: "",
    description: "",
    id: uuidv4(),
  });
  const [searchQuery, setSearchQuery] = useState("");

  const [width, setWidth] = useState("70%");

  useEffect(() => {
    if (selectedNote) {
      setWidth("25%");
    } else {
      setWidth("70%");
    }
  }, [selectedNote]);

  const handleTitleChange = (e) => {
    setNewNote({ ...newNote, title: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    setNewNote({ ...newNote, description: e.target.value });
  };

  const addNewNote = async (e) => {
    if (selectedCategory) {
      const newNoteWithCategory = {
        ...newNote,
        categoryId: selectedCategory.id,
        uid: uid,
      };
      setNotes([...notes, newNoteWithCategory]);
      setNewNote({ title: "", description: "", id: uuidv4() });
      setShowNoteForm(false);
      await addNote(newNoteWithCategory);
    }
    e.preventDefault();
  };

  const handleNoteClick = (note) => {
    setSelectedNote(note);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  };

  const filteredNotes = notes.filter((note) => {
    if (selectedCategory && note) {
      return (
        note.categoryId === selectedCategory.id &&
        (note.title.toLowerCase().includes(searchQuery) ||
          note.description.toLowerCase().includes(searchQuery))
      );
    }
    return false;
  });

  return (
    <>
      {selectedCategory && (
        <div className="container m-2">
          <div className="d-flex align-items-center justify-content-right  mb-4 ">
            <Button
              variant="success"
              className="btn-note create"
              onClick={() => setShowNoteForm(true)}
            >
              <div className="createnote-btn">
                <span>Create Note</span>
                <PlusOutlined className="create-icon" />
              </div>
            </Button>
            <Form.Group>
              <Input
                type="text"
                placeholder="Search Notes"
                value={searchQuery}
                onChange={handleSearch}
                prefix={<SearchOutlined />}
              />
            </Form.Group>
          </div>
          <div>
            {showNoteForm && (
              <div className="d-fixed">
                <Form onSubmit={addNewNote}>
                  <Form.Group>
                    <Form.Control
                    className="note-form"
                      type="text"
                      placeholder="Add a Title"
                      value={newNote.title}
                      onChange={handleTitleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                    className="note-form"
                      as="textarea"
                      rows={4}
                      placeholder="Write your note"
                      value={newNote.description}
                      onChange={handleDescriptionChange}
                      requiredstyle={{ resize: "none" }}
                    />
                  </Form.Group>
                  <Button type="submit" className="save-note-btn">
                    {" "}
                    Save Note
                    <CheckOutlined />
                  </Button>
                </Form>
              </div>
            )}
            {filteredNotes.map((note, index) => (
              <div
                onClick={() => handleNoteClick(note)}
                key={index}
                className="container mt-3 p-1"
                style={{
                  width: "100%",
                  backgroundColor: "#fff",
                  borderTop: "1px solid #EFEFEF",
                  cursor: "pointer",
                }}
              >
                <h5>{note.title}</h5>
                <p>{note.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
export default NewNote;
