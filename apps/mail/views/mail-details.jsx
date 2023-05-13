import { mailService } from "../services/mail.service.js"

const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM


export function MailDetails() {
    const [mail, setMail] = useState(null)
    const [nextMailId, setNextMailId] = useState(null)
    const [prevMailId, setPrevMailId] = useState(null)
    const { mailId } = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        loadMail()
        loadNextMailId()
        loadPrevMailId()
    }, [mailId])

    function loadMail() {
        mailService.get(mailId)
            .then(setMail)
            .catch(err => {
                console.log('Had issued in mail details:', err);
                navigate('/mail')
            })
    }
    function loadPrevMailId(){
        mailService.getPrevMailId(mailId)
            .then(setPrevMailId)
    }
    function loadNextMailId() {
        mailService.getNextMailId(mailId)
            .then(setNextMailId)
    }
    
    if (!mail) return <div>loading...</div>
    return (
        <section className="mail-details flex column">
            <h4>From: {mail.from}</h4>
            <h4>To: {mail.to}</h4>
            <h3>{mail.subject}</h3>
            <p>{mail.body}</p>
            <div className="btns-container flex">
            <Link to = {`/mail`}><i class="fa-solid fa-rotate-right"></i></Link>
            <Link to = {`/mail/${prevMailId}`}><i class="fa-solid fa-chevron-left"></i></Link>
            <Link to = {`/mail/${nextMailId}`}><i class="fa-solid fa-chevron-right"></i></Link>
            </div>
        </section>
    )
}
