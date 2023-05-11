const { Link } = ReactRouterDOM
import { NoteTxt } from "./note-txt.jsx"
import { NoteImg } from "./note-img.jsx"
import { NoteTodos } from "./note-todos.jsx"
export function NotePreview({ note,onRemoveNote }) {
    const {id, info, type, style } = note

    if (type === 'NoteTxt') {
        return <NoteTxt note={note} onRemoveNote={onRemoveNote}/>
    }
    if (type === 'NoteImg') {
        return <NoteImg note={note} onRemoveNote={onRemoveNote}/>
    }
    if (type === 'NoteTodos') {
        return <NoteTodos note={note} onRemoveNote={onRemoveNote}/>
    }
}