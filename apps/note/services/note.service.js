import { storageService } from "../../../services/async-storage.service.js"
import { utilService } from "../../../services/util.service.js"

const NOTE_KEY = 'noteDB'
_createNotes()
export const noteService = {
    query,
    // get,
    // remove,
    save,
    getEmptyNote,
    // getDefaultFilter,
    // getNextnoteId
}

function query() {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            return notes
        })
    }
    
    function _createNotes() {
        let notes = utilService.loadFromStorage(NOTE_KEY)
        if (!notes || !notes.length) {
            notes = [
                {
                    id: utilService.makeId(),
                    createdAt: 1112222,
                    type: 'NoteTxt',
                    isPinned: true,
                    style: {
                        backgroundColor: '#DD5C5C'
                    },
                    info: {
                        txt: 'Fullstack Me Baby!'
                    }
                },
                {
                    id: utilService.makeId(),
                    type: 'NoteImg',
                    isPinned: false,
                    info: {
                        url: 'http://some-img/me',
                        title: 'Bobi and Me'
                    },
                    style: {
                        backgroundColor: '#00d'
                    }
                },
                {
                    id: utilService.makeId(),
                type: 'NoteTodos',
                isPinned: false,
                info: {
                    title: 'Get my stuff together',
                    todos: [
                        { txt: 'Driving license', doneAt: null },
                        { txt: 'Coding power', doneAt: 187111111 }
                    ]
                }
            }
        ]
        console.log(notes);
        utilService.saveToStorage(NOTE_KEY, notes)
    }
    return notes
}


// function _createNote() {
//     const note = getEmptyNote()
//     note.id = utilService.makeId()
//     return note
// }

function getEmptyNote(txt='') {
    return{id:'', info:{txt},type:'NoteTxt'}
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}



