import { noteService } from "../services/note.service.js"
import { NoteImg } from "./note-img.jsx"
import { NoteTodos } from "./note-todos.jsx"
import { NoteTxt } from "./note-txt.jsx"

const { useEffect, useState, useRef } = React
const { useParams, useNavigate } = ReactRouterDOM


export function NoteEdit() {
    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
    const inputRef = useRef()
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (params.noteId) loadNote()
    }, [])

    function loadNote() {
        noteService.get(params.noteId)
            .then(setNoteToEdit)
            .catch(err => {
                console.log('Had issued in note edit:', err);
                navigate('/note')
            })
    }

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value
        const newInfo = { ...noteToEdit.info, [field]: value }
        setNoteToEdit(prevNote => ({ ...prevNote, info: newInfo }))
    }

    function onSaveNote(ev) {
        ev.preventDefault()
        console.log(noteToEdit);
        noteService.save(noteToEdit)
            .then(() => {
                setNoteToEdit(noteToEdit)
                navigate('/note')
            })
            .catch(err => {
                console.log('Had issued in note edit:', err);
            })
    }

    console.log(noteToEdit);
    const { info, type } = noteToEdit
    const { txt, title, url, todos } = info
    if (type === 'NoteTxt') {
        return (
            <section className="note-edit" >
                <NoteTxt note={noteToEdit} />
                <button onClick={onSaveNote}>{noteToEdit.id ? 'Save' : 'Add'}</button>
            </section>
        )

    }
    if (type === 'NoteImg') {
        return (
            <section className="note-edit" >
                <NoteImg note={noteToEdit} />
                <button onClick={onSaveNote}>{noteToEdit.id ? 'Save' : 'Add'}</button>
            </section>
        )
    }
    if (type === 'NoteTodos') {

        return (
            <section className="note-edit" >
                <NoteTodos note={noteToEdit} />
                <button onClick={onSaveNote} >{noteToEdit.id ? 'Save' : 'Add'}</button>
            </section>
        )
    }
}


