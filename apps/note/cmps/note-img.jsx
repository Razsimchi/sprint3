import { noteService } from "../services/note.service.js"

const { useState } = React

export function NoteImg({ note }) {
    const { info, style } = note
    const [isEditable, setIsEditable] = useState(true)

    function handleContentChange(ev) {
        info.title = ev.target.textContent
        noteService.save(note)
    }

    return (
        <li>
            <article className="note-img">
                <h2 contentEditable={isEditable} onBlur={handleContentChange} suppressContentEditableWarning>{info.title}</h2>
                <img src={info.url}></img>
            </article>
        </li>
    )
}
