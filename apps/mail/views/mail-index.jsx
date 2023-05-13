const { useEffect, useState } = React
const { useSearchParams } = ReactRouterDOM

import { MailCompose } from "../cmps/mail-compose.jsx";
import { MailFilter } from "../cmps/mail-filter.jsx";
import { MailList } from "../cmps/mail-list.jsx";
import { mailService } from "../services/mail.service.js";

export function MailIndex() {

    const [searchParams, setSearchParams] = useSearchParams()
    const [critera, setCritera] = useState(mailService.getDefaultCriteria(searchParams))
    const [mails, setMails] = useState([])
    const [isNewMsg, setIsNewMsg] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        loadMails()
        setSearchParams(critera)
    }, [isNewMsg, critera])

    function toggleIsNewMsg() {
        setIsNewMsg((prevIsNewMsg) => !prevIsNewMsg)
    }
    function onRemoveMail(mailId) {
        mailService.get(mailId).then((mail) => {
            mail.removedAt = Date.now()
            mailService.put(mail)
                .then(() => {
                    const updatedMails = mails.filter(mail => mail.id !== mailId)
                    setMails(updatedMails)
                })
        })
    }

    function onStarOrMail(mailId, key) {
        mailService.get(mailId).then((mail) => {
            mail[key] = !mail[key]
            mailService.put(mail)
                .then(() => {
                    const updatedMails = mails.map(mail => {
                        if (mail.id === mailId) mail[key] = !mail[key]
                        return mail
                    })
                    setMails(updatedMails)

                })
        })
    }

    function loadMails() {
        mailService.query(critera).then(setMails)
    }
    function onSetCritera(critera) {
        setCritera(prevCritera => ({ ...prevCritera, ...critera }))
    }
    function handleChange({ target }) {
        const field = target.name
        const value = target.value
        setCritera(prevCritera => ({ ...prevCritera, [field]: value }))
        navigate(`/mail`)
    }
    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetCritera(critera)
    }
    function onMenu() {
        setIsMenuOpen(prevIsMenuOpen => !prevIsMenuOpen)
    }
    const menuState = isMenuOpen ? 'menu-open' : ''
    return (

        <React.Fragment>
            <div onClick={onMenu} className={`menu-screen ${menuState}`}></div>
            <div className="mail-index">
                <form className="flex align-center" onSubmit={onSubmitFilter} >
                    <input onChange={handleChange} name="txt" id="txt" type="search" placeholder=" By Subject" /></form>
                <button onClick={onMenu} className="hamburger-btn"><i class=" fa-solid fa-bars fa-2xl"></i></button>
                <div className="compose-container flex justify-center">
                    <button title="New mail" className="btn btn-compose" onClick={toggleIsNewMsg}><i class="fa-solid fa-pencil fa-xl"></i></button>
                </div>
                <div className={`mail-status-filter ${menuState} `}>
                    <MailFilter onSetCritera={onSetCritera} critera={critera} />
                </div>
                
                <MailList mails={mails} onStarOrMail={onStarOrMail} onRemoveMail={onRemoveMail} />
                {isNewMsg && <MailCompose toggleIsNewMsg={toggleIsNewMsg} />}
            </div>
        </React.Fragment>
    )
}

