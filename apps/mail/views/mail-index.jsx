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


    function loadMails() {
        mailService.query(critera).then(setMails)
    }
    function onSetCritera(critera) {
        setCritera(prevCritera => ({ ...prevCritera, ...critera }))
    }


    return (
        <div className = "mail-index">
            <div className="mail-status-filter">
            <img className="btn" src="../../../assets/icons/icons8-edit-file-24.png" onClick={toggleIsNewMsg}/>
                <MailFilter onSetCritera={onSetCritera} critera={critera} />

            </div>

            <MailList mails={mails} onRemoveMail={onRemoveMail} />
            {isNewMsg && <MailCompose toggleIsNewMsg={toggleIsNewMsg} />}
        </div>
    )
}

