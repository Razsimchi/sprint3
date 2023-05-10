import { noteService } from "../services/note.service.js"

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
                // showErrorMsg('note not found!')
            })
    }

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value
        const newInfo={...noteToEdit.info,[field]: value}
        setNoteToEdit(prevNote => ({ ...prevNote,info: newInfo }))
    }

    function onSaveNote(ev) {
        ev.preventDefault()
        // if (!noteToEdit.info.title) {
        //     inputRef.current.focus()
        //     return
        // }
 
        noteService.save(noteToEdit)
        .then(() => {
                console.log(noteToEdit);
                navigate('/note')
            })
            .catch(err => {
                console.log('Had issued in note edit:', err);
                // showErrorMsg('Can not save note!')
            })
    }

    const { info } = noteToEdit
    const {txt}=info
    return (
        <section className="note-edit">
            <h2>{noteToEdit.id ? 'Edit' : 'Add'} note</h2>

            <form onSubmit={onSaveNote} >
                <label htmlFor="txt"></label>
                <input ref={inputRef} onChange={handleChange} value={txt} type="text" name="txt" id="txt"/>
                <button>{noteToEdit.id ? 'Save' : 'Add'}</button>
            </form>

        </section>
    )

}