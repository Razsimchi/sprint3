import { NotePreview } from "./note-preview.jsx";


export function NoteList({notes,onEditNote}) {
    return (
        <ul className="note-list">
            {notes.map(note =>
                <li key={note.id}>
                    <NotePreview note={note} />
                    <button onClick={() => onEditNote(note.id)}>Edit
                    </button>
                </li>
            )}
        </ul>
    )
}