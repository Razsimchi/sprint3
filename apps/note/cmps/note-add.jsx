import { noteService } from '../services/note.service.js'
import { NoteAddTodos } from './note-add-todos.jsx'
const { useState } = React

export function NoteAdd({ notes, setNotes }) {
  const [noteToAdd, setNoteToAdd] = useState(noteService.getEmptyNote())
  const [inputValue, setInputValue] = useState('')
  const [typeInput, setTypeInput] = useState('NoteTxt')

  function onSaveNote(ev, noteToAdd) {
    ev.preventDefault()
    console.log(noteToAdd)
    noteService
      .save(noteToAdd)
      .then(() => {
        setNotes([...notes, noteToAdd])
        setInputValue('')
        navigate('/note')
      })
      .catch((err) => {
        console.log('Had issue in note add:', err)
      })
  }

  function handleChange({ target }) {
    setInputValue(target.value)
    setNoteToAdd({ ...noteToAdd, info: { ...noteToAdd.info, title: target.value } })
  }

  function onClickList() {
    console.log(typeInput)
    setTypeInput('NoteTodos')
  }

  return (
    <section className="note-add">
      <form onSubmit={(ev) => onSaveNote(ev, noteToAdd)}>
        <label htmlFor="txt" className="note-add-label">
          <input
            onChange={handleChange}
            value={inputValue}
            name="txt"
            id="txt"
            type="text"
            placeholder="Enter Note"
            className="note-add-input"
          />
          <button onClick={onClickList} className="note-add-button">
            <img src="../assets/icons/icons8-list-30.png" alt="List Icon" className="note-add-icon" />
          </button>
        </label>
        <button type="submit" className="note-add-submit">
          Add
        </button>
      </form>
      {typeInput === 'NoteTodos' && <NoteAddTodos onSaveNote={onSaveNote} />}
    </section>
  )
}


// import { noteService } from '../services/note.service.js'
// import { NoteAddTodos } from './note-add-todos.jsx'
// const { useState } = React

// export function NoteAdd({ notes, setNotes }) {
//     const [noteToAdd, setNoteToAdd] = useState(noteService.getEmptyNote())
//     const [inputValue, setInputValue] = useState("")
//     const [typeInput, setTypeInput] = useState('NoteTxt')


//     function onSaveNote(ev, noteToAdd) {
//         ev.preventDefault()
//         console.log(noteToAdd)
//         noteService.save(noteToAdd)
//             .then(() => {
//                 setNotes([...notes, noteToAdd])
//                 setInputValue("")
//                 navigate('/note')
//             })
//             .catch(err => {
//                 console.log('Had issue in note add:', err)
//             })
//     }

//     function handleChange({ target }) {
//         setInputValue(target.value)
//         setNoteToAdd({ ...noteToAdd, info: { ...noteToAdd.info, title: target.value } })
//     }

//     function onClickList() {
//         console.log(typeInput)
//         setTypeInput('NoteTodos')
//     }

//     return (
//         <section className="note-add flex">
//             {typeInput === 'NoteTodos' && <NoteAddTodos onSaveNote={onSaveNote} />}
//             <form onSubmit={(ev) => onSaveNote(ev, noteToAdd)}>
//                 <label htmlFor="txt">
//                         <button onClick={onClickList}>
//                             <img src="../assets/icons/icons8-list-30.png" />
//                         </button>
//                     <input onChange={handleChange} value={inputValue} name="txt" id="txt" type="text" placeholder="Enter Note" />
                    
//                 </label>
//                 <button type="submit">Add</button>
//             </form>
//         </section>
//     )
// }
