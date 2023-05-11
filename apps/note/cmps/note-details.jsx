const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

console.log('wfwe');
import { noteService } from "../services/note.service.js"

export function NoteDetails() {
    const [note, setNote] = useState(null)
    // const [nextnoteId, setNextnoteId] = useState(null)
    const { noteId } = useParams()
    const navigate = useNavigate()
    const { style, info } = note
    const [isEditable, setIsEditable] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);


    useEffect(() => {
        loadNote()
        // loadNextNoteId()
    }, [noteId])

    function loadNote() {
        noteService.get(noteId)
            .then(setNote)
            .catch(err => {
                console.log('Had issued in note details:', err);
                navigate('/note')
            })
    }

    function loadNextnoteId() {
        noteService.getNextnoteId(noteId)
            .then(setNextnoteId)
    }

    function onBack() {
        navigate('/note')
    }

    // if (!note) return <div>Loading...</div>
    return (
        <div>
            <article style={style} className="note-details">
                <h2 contentEditable={isEditable} onBlur={handleContentChange}>{info.txt}</h2>
            </article>
            <button onClick={() => onEditNote(note.id)}>Edit
            </button>
        </div>
        )

}