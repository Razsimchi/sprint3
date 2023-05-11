const { Link } = ReactRouterDOM
import { NoteTxt } from "./note-txt.jsx"
import { NoteImg } from "./note-img.jsx"
import { NoteTodos } from "./note-todos.jsx"
export function NotePreview({ note }) {
    const {id, info, type, style } = note

   
    console.log(note);
    if (type === 'NoteTxt') {
        return <NoteTxt note={note}/>
    }
    if (type === 'NoteImg') {
        return <NoteImg note={note}/>
    }
    if (type === 'NoteTodos') {
        return <NoteTodos note={note}/>
    }
}