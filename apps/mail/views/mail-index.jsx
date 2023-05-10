import { MailCompose } from "../cmps/mail-compose.jsx";
import { MailList } from "../cmps/mail-list.jsx";
import { mailService } from "../services/mail.service.js";

const { useEffect, useState } = React

export function MailIndex() {

    const[critera ,setCritera] = useState(mailService.getDefaultCriteria())
    const [mails ,setMails] = useState([])
    const [isNewMsg, setIsNewMsg] = useState(false)

    useEffect(()=> {
        loadMails()
    },[])

    function toggleIsNewMsg(){
        setIsNewMsg((prevIsNewMsg)=>!prevIsNewMsg)
     }   
    function onRemoveMail(mailId) {
        mailService.remove(mailId).then(() => {
            const updatedMails = mails.filter(mail => mail.id !== mailId)
            setMails(updatedMails)
            // showSuccessMsg(`Mail removed!`)
        })

    }

    function loadMails(){
        mailService.query().then(setMails)
    }

   
    return (
        <div>
            <h1>mail app</h1>
            <div className="mail-status-filter">
            <button onClick = {toggleIsNewMsg}>New Email</button>

            </div>
            
            <MailList mails = {mails} onRemoveMail = {onRemoveMail}/>
            {isNewMsg && <MailCompose toggleIsNewMsg={toggleIsNewMsg}/>}
            </div>
    )
}

