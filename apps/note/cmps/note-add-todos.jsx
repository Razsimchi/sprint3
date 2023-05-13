import { noteService } from "../services/note.service.js"
const { useState } = React

export function NoteAddTodos({ onSaveNote }) {
  const [noteToAdd, setNoteToAdd] = useState(noteService.getEmptyNote("", "NoteTodos"))

  function handleChange(ev, idx) {
    const { value } = ev.target
    const updatedTodos = noteToAdd.info.todos.map((todo, i) => {
      if (i === idx) {
        return {
          ...todo,
          txt: value,
        }
      }
      return todo
    })

    const updatedNote = {
      ...noteToAdd,
      info: {
        ...noteToAdd.info,
        todos: updatedTodos,
      },
    }

    setNoteToAdd(updatedNote)
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    console.log(noteToAdd)
  }

  function onAddLine() {
    const updatedTodos = [...noteToAdd.info.todos, { txt: "", doneAt: null, isChecked: "" }]
    const updatedNote = {
      ...noteToAdd,
      info: {
        ...noteToAdd.info,
        todos: updatedTodos,
      },
    }

    setNoteToAdd(updatedNote)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={noteToAdd.info.title}
        onChange={(ev) => setNoteToAdd({ ...noteToAdd, info: { ...noteToAdd.info, title: ev.target.value } })}
        placeholder="Enter Title"
      />
      <ul className="note-todos">
        {noteToAdd.info.todos.map((todo, idx) => (
          <li key={idx}>
            <label htmlFor={`txt-${idx}`}>
              <input
                onChange={(ev) => handleChange(ev, idx)}
                value={todo.txt || ""}
                name={`txt-${idx}`}
                id={`txt-${idx}`}
                type="text"
                placeholder="Enter Note"
              />
            </label>
          </li>
        ))}
      </ul>
      <div className="note-todos-btns">
        <button onClick={(ev) => onSaveNote(ev, noteToAdd)} type="submit">
          Add
        </button>
        <button onClick={onAddLine} type="button">
          +
        </button>
      </div>
    </form>
  )
}


// import { noteService } from "../services/note.service.js"
// const { useState } = React

// export function NoteAddTodos({ onSaveNote }) {
//   const [noteToAdd, setNoteToAdd] = useState(noteService.getEmptyNote("", "NoteTodos"))

//   function handleChange(ev, idx) {
//     const { value } = ev.target
//     const updatedTodos = noteToAdd.info.todos.map((todo, i) => {
//       if (i === idx) {
//         return {
//           ...todo,
//           txt: value,
//         }
//       }
//       return todo
//     })

//     const updatedNote = {
//       ...noteToAdd,
//       info: {
//         ...noteToAdd.info,
//         todos: updatedTodos,
//       },
//     }

//     setNoteToAdd(updatedNote)
//   }

//   function handleSubmit(ev) {
//     ev.preventDefault()
//     console.log(noteToAdd)
//   }

//   function onAddLine() {
//     const updatedTodos = [...noteToAdd.info.todos, { txt: "", doneAt: null, isChecked: "" }]
//     const updatedNote = {
//       ...noteToAdd,
//       info: {
//         ...noteToAdd.info,
//         todos: updatedTodos,
//       },
//     }

//     setNoteToAdd(updatedNote)
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         value={noteToAdd.info.title}
//         onChange={(ev) => setNoteToAdd({ ...noteToAdd, info: { ...noteToAdd.info, title: ev.target.value } })}
//         placeholder="Enter Title"
//       />
//       {noteToAdd.info.todos.map((todo, idx) => (
//         <label key={idx} htmlFor={`txt-${idx}`}>
//           <input
//             onChange={(ev) => handleChange(ev, idx)}
//             value={todo.txt || ""}
//             name={`txt-${idx}`}
//             id={`txt-${idx}`}
//             type="text"
//             placeholder="Enter Note"
//           />
//         </label>
//       ))}
//       <button onClick={(ev) => onSaveNote(ev, noteToAdd)} type="submit">
//         Add
//       </button>
//       <button onClick={onAddLine} type="button">
//         +
//       </button>
//     </form>
//   )
// }
