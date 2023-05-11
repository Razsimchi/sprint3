import { noteService } from "../services/note.service";

const {useState}= React


export function NoteImg({note}){
    const {info,style}=note
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
            <article style={style} className="note-img">
                <h2 contentEditable={isEditable} onBlur={handleContentChange}>{info.title}</h2>
                <img src={info.url}></img>
            </article>
            <button onClick={() => onEditNote(note.id)}>Edit
            </button>
        </div>
        )
}