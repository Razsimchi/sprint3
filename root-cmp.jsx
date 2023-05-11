const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/app-header.jsx"
import { About } from "./views/about.jsx"
import { Home } from "./views/home.jsx"
import { MailIndex } from "./apps/mail/views/mail-index.jsx"
// import { NoteIndex } from "./apps/note/views/note-index.jsx"
// import { NoteEdit } from "./apps/note/cmps/note-edit.jsx"
import { MailDetails } from "./apps/mail/views/mail-details.jsx"



export function App() {
    return <Router>
        <section className="app">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                {/* <Route path="/note" element={<NoteIndex />} />
                <Route path="/note/edit" element={<NoteEdit />} />
                <Route path="/note/edit/:noteId" element={<NoteEdit />} /> */}
                <Route path="/mail" element={<MailIndex />} />
                <Route path="/mail/inbox" element={<MailIndex />} />
                <Route path="/mail/sent" element={<MailIndex />} />
                <Route path="/mail/trash" element={<MailIndex />} />
                <Route path="/mail/:mailId" element={<MailDetails />} />
            </Routes>
        </section>
    </Router>
}
