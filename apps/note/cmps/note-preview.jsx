const { Link } = ReactRouterDOM
import { NoteTxt } from "./note-txt.jsx"
import { NoteImg } from "./note-img.jsx"
import { NoteTodos } from "./note-todos.jsx"
export function NotePreview({ note, onRemoveNote }) {
    const { id, info, type, style } = note

    if (type === 'NoteTxt') {
        return (
            <article key={id} style={style} className="note-txt">
                <NoteTxt note={note} />
                <div className="icon flex" >
                    <div>
                        <img onClick={() => onRemoveNote(id)} src="../assets/icons/icons8-trash-24.png" />
                    </div>
                    <div>
                        <Link to={`/note/edit/${id}`} >
                            <img src="../assets/icons/icons8-edit-file-24.png" />
                        </Link></div>
                </div>
            </article>
        )
    }
    if (type === 'NoteImg') {
        return (
            <article key={id} style={style} className="note-img" >
                <NoteImg note={note} />
                <div className="icon flex" >
                    <div>
                        <img onClick={() => onRemoveNote(note.id)} src="../assets/icons/icons8-trash-24.png" />
                    </div>
                    <div>
                        <Link to={`/note/edit/${note.id}`} >
                            <img src="../assets/icons/icons8-edit-file-24.png" />
                        </Link></div>
                </div>
            </article>
        )
    }
    if (type === 'NoteTodos') {
        return (
            <article key={id} className="note-todos" >
                <NoteTodos note={note} />
                <div className="icon flex" >
                    <div>
                        <img onClick={() => onRemoveNote(note.id)} src="../assets/icons/icons8-trash-24.png" />
                    </div>
                    <div>
                        <Link to={`/note/edit/${note.id}`} >
                            <img src="../assets/icons/icons8-edit-file-24.png" />
                        </Link></div>
                </div>
            </article>
        )
    }
}