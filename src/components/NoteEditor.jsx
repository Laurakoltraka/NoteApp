import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { DeleteFilled, CheckOutlined  } from "@ant-design/icons";


const NoteEditor = ({  selectedNote ,handleSave,handleDelete}) =>
 {
    const [editedNote, setEditedNote] = useState(selectedNote);

    useEffect(() => {
        setEditedNote(selectedNote);
    }, [selectedNote]);


    const handleTitleChange = (title) => {
        setEditedNote((prevNote) => ({ ...prevNote, title }));
      };

      const handleDescriptionChange = (description) => {
        setEditedNote((prevNote) => ({ ...prevNote, description }));
      };
    
      const onSaveNote = () => {
        handleSave(editedNote);
      };
    
      const onDeleteNote = () => {
        handleDelete(editedNote);
      };

   

    return (
        <div className="container m-2"
            style={{width: "50%", backgroundColor: "#fff", borderRadius: "8px", height: "100vh",
            }}>
            <div className="d-flex align-items-center justify-content-between mt-2">
            <h3 style={{ fontSize: '30px' ,marginBottom:"50px"}}>Edit Note</h3>
              
            </div>
            <Form>
                <Form.Group>
                   <Form.Control
                        type="text"
                        style={{borderRadius:"0px", borderTop: "3px solid #EFEFEF", borderLeft:"none",borderRight:"none",borderBottom:"none"}}
                        value={editedNote.title}
                        onChange={(e) => {
                            handleTitleChange(e.target.value);
                        }}
                    />
                </Form.Group>
                <Form.Group>
                    {/* <Form.Label>Description:</Form.Label> */}
                    <Form.Control
                        as="textarea"
                        rows={4}
                        value={editedNote.description}
                        style={{borderRadius:"0px", borderTop: "3px solid #EFEFEF", borderLeft:"none",borderRight:"none",borderBottom:"none"}}

                        onChange={(e) => {
                            handleDescriptionChange(e.target.value);
                        }}
                    />
                </Form.Group>
                <div className="d-flex align-items-center justify-content-between mt-5">
                    <Button variant="danger" style={{backgroundColor:"#FE4C4A", borderStyle:"none"}} onClick={onDeleteNote}>
                        <div className="d-flex align-items-center gap-1">
                            <span>Delete Note</span>

                            <DeleteFilled />
                        </div>
                    </Button>
                    <Button variant="success"  style={{backgroundColor:"#71CF48",borderStyle:"none"}} onClick={onSaveNote}>
                        <div className="d-flex align-items-center gap-1">
                            <span>Save Changes</span>

                            <CheckOutlined />
                        </div>
                    </Button>
                </div>
            </Form>
        </div >
    );
};

export default NoteEditor;