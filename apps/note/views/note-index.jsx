import { NoteAdd } from "../cmps/note-add.jsx"
import { NoteList } from "../cmps/note-list.jsx"
import { noteService } from "../services/note.service.js"

const { useEffect, useState } = React

export function NoteIndex() {
    const [notes, setNotes] = useState([])

    useEffect(() => {
        loadNotes()
    }, [])

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
            <NoteAdd notes={notes} setNotes={setNotes}/>
            <section className="note-index">
                <NoteList notes={notes}  onRemoveNote={onRemoveNote} />
            </section>
        </div>
    )
} 

// import { NoteAdd } from "../cmps/note-add.jsx"
// import { NoteList } from "../cmps/note-list.jsx"
// import { noteService } from "../services/note.service.js"

// const { useEffect, useState } = React

// export function NoteIndex() {
//     const [notes, setNotes] = useState([])

//     useEffect(() => {
//         loadNotes()
//     }, [])

//     function loadNotes() {
//         noteService.query().then(notes => setNotes(notes))
//     }

//     function onRemoveNote(noteId) {
//         noteService.remove(noteId).then(() => {
//             const updatedNotes = notes.filter(note => note.id !== noteId)
//             setNotes(updatedNotes)
//         })

//     }

//     return (
//         <div>
//             <NoteAdd notes={notes} setNotes={setNotes}/>
//             <section className="note-index">
//                 <NoteList notes={notes}  onRemoveNote={onRemoveNote} />
//             </section>
//         </div>
//     )
// }
