import { noteService } from "../services/note.service.js"
const { useState } = React

export function NoteTodos({ note }) {
    const { info } = note
    const [isEditable, setIsEditable] = useState(false)
    const [isChecked, setIsChecked] = useState(info.todos.map((todo) => todo.isChecked))
    const { todos } = info

    function handleContentChange(ev) {
        note.info.title = ev.target.textContent
        noteService.save(note)
    }

    function onEditNote() {
        setIsEditable(!isEditable)
    }

    function handleCheckboxChange(idx) {
        setIsChecked((prevChecked) => {
            const updatedChecked = [...prevChecked]
            updatedChecked[idx] = !updatedChecked[idx]
            return updatedChecked
        })
        todos[idx].isChecked = !todos[idx].isChecked
        console.log(note);
        noteService.save(note)
    }

    return (
        <article className="note-todos">
            <h2 contentEditable={isEditable} onBlur={handleContentChange}>
                {info.title}
            </h2>
            <ul className="note-todos-list">
                <label htmlFor="todos"></label>
                {todos.map((todo, idx) => (
                    <li
                        id="todos"
                        style={{ textDecoration: isChecked[idx] ? 'line-through' : 'none' }}
                        onChange={() => handleCheckboxChange(idx)}
                        key={idx}
                    >
                        {todo.txt}
                        <input type="checkbox" value={todo.txt} />
                    </li>
                ))}
            </ul>
        </article>
    )
}


