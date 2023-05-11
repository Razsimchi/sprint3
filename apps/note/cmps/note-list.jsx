import { NotePreview } from "./note-preview.jsx";
const { Link } = ReactRouterDOM


export function NoteList({ notes, onRemoveNote }) {


    return (

        <ul className="note-list grid">
            {notes.map(note =>
                    <NotePreview note={note} onRemoveNote={onRemoveNote} />
            )}
        </ul>
    )
}

        // <ul className="note-list grid">
        //     {notes.map(note =>
        //         <li key={note.id}>
        //             <NotePreview note={note} />
        //             <button onClick={() => onRemoveNote(note.id)} >Remove</button>
        //             <button><Link to={`/note/edit/${note.id}`} >Edit</Link></button>

        //         </li>
        //     )}
        // </ul>