import { NoteEdit } from "../cmps/note-edit.jsx"
import { NoteList } from "../cmps/note-list.jsx"
import { noteService } from "../services/note.service.js"

const { useEffect, useState } = React
const { Link, useSearchParams } = ReactRouterDOM

export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        loadNotes()
    }, [])

    function openModal() {
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
    }


    function loadNotes() {
        noteService.query().then(notes => setNotes(notes))
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId).then(() => {
            const updatedNotes = notes.filter(note => note.id !== noteId)
            setNotes(updatedNotes)
        })

    }


    return (
        <div>
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <NoteEdit closeModal={closeModal} />
                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
            <section className="note-index">
                <button onClick={openModal}>Add Note</button>
                <Link to="/note/edit">Add Note</Link>
                <NoteList notes={notes} onRemoveNote={onRemoveNote} />
            </section>
        </div>
    )
}
