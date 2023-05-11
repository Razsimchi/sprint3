import { noteService } from "../services/note.service";

const { useState } = React
const { Link } = ReactRouterDOM


export function NoteImg({ note, onRemoveNote }) {
    const { info, style } = note
    const [isEditable, setIsEditable] = useState(false);

    function handleContentChange(ev) {
        note.info.txt = ev.target.textContent
        noteService.save(note)
    }

    function onEditNote() {
        setIsEditable(!isEditable)
    }
    return (
        <li className="flex column space-between" style={style} key={note.id}>
            <article className="note-img">
                <h2 contentEditable={isEditable} onBlur={handleContentChange}>{info.title}</h2>
                <img src={info.url}></img>
            </article>
            <article className="flex space-between" >
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
