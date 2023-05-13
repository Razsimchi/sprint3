import { noteService } from "../services/note.service.js"
const { useState } = React

export function NoteTxt({ note }) {
    const { style, info } = note
    const [isEditable, setIsEditable] = useState(true)
    

    function handleContentChange(ev) {
        info.title = ev.target.textContent
        noteService.save(note)
    }

    return (
        <li>
                <h2 contentEditable={isEditable} onBlur={handleContentChange} suppressContentEditableWarning>{info.title}</h2>
        </li>

    )
}
