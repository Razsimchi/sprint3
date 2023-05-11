import { noteService } from "../services/note.service.js"
import { NoteImg } from "./note-img.jsx"
import { NoteTodos } from "./note-todos.jsx"

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
        noteService.save(noteToEdit)
            .then(() => {
                setNoteToEdit(noteToEdit)
                navigate('/note')
            })
            .catch(err => {
                console.log('Had issued in note edit:', err);
            })
    }

    const { info, type } = noteToEdit
    const { txt, title, url, todos } = info

    if (type === 'NoteTxt') {

        return (
            <section className="note-edit">
                <h2>{noteToEdit.id ? 'Edit' : 'Add'} note</h2>

                <form onSubmit={onSaveNote} >
                    <label htmlFor="txt"></label>
                    <input ref={inputRef} onChange={handleChange} value={txt} type="text" name="txt" id="txt" />
                    <button>{noteToEdit.id ? 'Save' : 'Add'}</button>
                </form>

            </section>
        )
    }
    if (type === 'NoteImg') {
        console.log(noteToEdit);
        return <NoteImg noteToEdit={noteToEdit} />
    }
    if (type === 'NoteTodos') {

        return <NoteTodos noteToEdit={noteToEdit} />

    }


}


