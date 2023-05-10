import { NoteEdit } from "../cmps/note-edit.jsx"
import { NoteList } from "../cmps/note-list.jsx"
import { noteService } from "../services/note.service.js"

const { useEffect, useState } = React
const { Link, useSearchParams } = ReactRouterDOM

export function NoteIndex() {
    const [notes, setNotes] = useState([])
    useEffect(() => {
        loadNotes()
    }, [])
    
    function loadNotes() {
        noteService.query().then(notes => setNotes(notes))
    }

    function onEditNote(noteId){
        noteService.get(noteId).then(setNotes)
    }
    return (
        <section className="note-index">
            <NoteEdit />
            <NoteList notes={notes} onEditNote={onEditNote} />
        </section>
    )
}
