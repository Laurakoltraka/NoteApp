import { Button } from "react-bootstrap";
import {CaretDownFilled, CaretRightFilled,FolderFilled,PlusOutlined,} from "@ant-design/icons";
import './Sidebar.css'

const Sidebar = ({categories,onAddNewCategory,setSelectedCategory,selectedCategory,setSelectedNote,setShowNoteEditor,notes}) => {
  const nrOfNotesInCategory = (category) => {
    return notes.filter((note) =>
     note.categoryId === category.id).length;
  };

  return (
    <>
      <div className="sidebar " >
        <div >
          <div className="list-group ">
            <Button variant="success" className="btn-block create" onClick={onAddNewCategory} >
              <div className="create-btn">
                <span >Create a Category </span>
                <PlusOutlined  className="plus-icon"/>
              </div>
            </Button>
            {categories.map((category, index) => (
              <Button  key={index} className={`p-2 my-2 btn-block  d-flex align-items-center justify-content-start gap-3 ${
                  selectedCategory === category ? "btn-clicked" : "" }`}
                onClick={() => { setSelectedCategory(category); setSelectedNote(null); setShowNoteEditor(false); }} >
                <FolderFilled className="folder-icon"/>
                {`Category `}{"  "}
                {` (${nrOfNotesInCategory(category)})`}
                {selectedCategory === category ? (
                  <CaretRightFilled className="icon"/>
                ) : (
                  <CaretDownFilled className="icon"/>
                )}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
