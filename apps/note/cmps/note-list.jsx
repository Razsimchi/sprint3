import { NotePreview } from "./note-preview.jsx"

export function NoteList({ notes, onRemoveNote }) {


    return (

        <ul className="note-list grid">
            {notes.map(note =>
                    <NotePreview key={note.id} note={note} onRemoveNote={onRemoveNote} />
            )}
        </ul>
    )
}
