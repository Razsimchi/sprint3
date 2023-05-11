import { MailCompose } from "../cmps/mail-compose.jsx";
import { MailFilter } from "../cmps/mail-filter.jsx";
import { MailList } from "../cmps/mail-list.jsx";
import { mailService } from "../services/mail.service.js";

const { useEffect, useState } = React

export function MailIndex() {

    const [critera, setCritera] = useState(mailService.getDefaultCriteria())
    const [mails, setMails] = useState([])
    const [isNewMsg, setIsNewMsg] = useState(false)

    useEffect(() => {
        loadMails()
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


    function loadMails() {
        mailService.query(critera).then(setMails)
    }
    function onSetCritera(critera) {
        setCritera(prevCritera => ({ ...prevCritera, ...critera }))
    }


    return (
        <div>
            <h1>mail app</h1>
            <div className="mail-status-filter">
                <MailFilter onSetCritera={onSetCritera} critera={critera} />
                <button onClick={toggleIsNewMsg}>New Email</button>

            </div>

            <MailList mails={mails} onRemoveMail={onRemoveMail} />
            {isNewMsg && <MailCompose toggleIsNewMsg={toggleIsNewMsg} />}
        </div>
    )
}

