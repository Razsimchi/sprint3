import { utilService } from "../../../services/util.service"
import { noteService } from "../services/note.service.js";
 const {useState}= React

export function NoteTxt({ note, handleContentChange }) {
    const { style, info } = note
    const [isEditable, setIsEditable] = useState(false);
    
    function handleContentChange(ev) {
        note.info.txt = ev.target.textContent
        noteService.save(note)
    }

    function onEditNote(){
        setIsEditable(!isEditable)
       }
    return (
    <div>
        <article style={style} className="note-preview">
            <h2 contentEditable={isEditable} onBlur={handleContentChange}>{info.txt}</h2>
        </article>
        <button onClick={() => onEditNote(note.id)}>Edit
        </button>
    </div>
    )
}
