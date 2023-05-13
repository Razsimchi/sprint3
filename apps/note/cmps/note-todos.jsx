import { noteService } from "../services/note.service.js"
const { useState } = React

export function NoteTodos({ note }) {
  const { info } = note
  const [isEditable, setIsEditable] = useState(true)
  const [todos, setTodos] = useState(info.todos)
  const [isChecked, setIsChecked] = useState(info.todos.map((todo) => todo.isChecked))
  const [isCellEditable, setIsCellEditable] = useState(info.todos.map(() => false))

  function handleContentChange(ev, idx) {
    const updatedTodos = [...todos]
    if (idx === undefined) info.title = ev.target.textContent
    else updatedTodos[idx].txt = ev.target.textContent
    setTodos(updatedTodos)
    noteService.save(note)
  }

  function handleCheckboxChange(ev, idx) {
    const updatedChecked = [...isChecked]
    updatedChecked[idx] = ev.target.checked
    setIsChecked(updatedChecked)
    const updatedTodos = [...todos]
    updatedTodos[idx].isChecked = ev.target.checked
    setTodos(updatedTodos)
    noteService.save(note)
  }

  function handleTodoClick(idx) {
    const updatedEditable = [...isCellEditable]
    updatedEditable[idx] = true
    setIsCellEditable(updatedEditable)
  }

  return (
    <li>
      <article className="note-todos">
        <h2 contentEditable={isEditable} onBlur={handleContentChange} suppressContentEditableWarning>
          {info.title}
        </h2>
        <ul className="note-todos-list">
          {todos.map((todo, idx) => (
            <li key={idx}>
              <span
                onClick={() => handleTodoClick(idx)}
                contentEditable={isCellEditable[idx]}
                onBlur={(ev) => handleContentChange(ev, idx)}
                suppressContentEditableWarning
                style={{ textDecoration: todo.isChecked ? 'line-through' : 'none' }}
              >
                {todo.txt}
              </span>
              <input
                type="checkbox"
                checked={todo.isChecked}
                onChange={(ev) => handleCheckboxChange(ev, idx)}
              />
            </li>
          ))}
        </ul>
      </article>
    </li>
  )
}


