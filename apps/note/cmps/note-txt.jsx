import { utilService } from "../../../services/util.service"
import { noteService } from "../services/note.service.js";
const { useState } = React
const { Link } = ReactRouterDOM

export function NoteTxt({ note, handleContentChange, onRemoveNote }) {
    const { style, info } = note
    const [isEditable, setIsEditable] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    function openModal() {
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
    }
    function handleContentChange(ev) {
        note.info.txt = ev.target.textContent
        noteService.save(note)
    }

    function onEditNote() {
        // openModal()
        setIsEditable(!isEditable)
    }
    return (
        <li className="flex column space-between" style={style} key={note.id}>
            <article className="note-preview">
                <h2 contentEditable={isEditable} onBlur={handleContentChange}>{info.txt}</h2>
            </article>
            <article className="flex space-between">
                <div onClick={() => onRemoveNote(note.id)} >
                    <img src="../assets/icons/icons8-trash-24.png" />
                </div>
                <div><Link to={`/note/edit/${note.id}`} >
                    <img src="../assets/icons/icons8-edit-file-24.png" />
                </Link></div>
            </article>
        </li>

    )
}
