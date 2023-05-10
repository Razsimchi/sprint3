import { mailService } from "../services/mail.service.js"

const { useEffect, useState, useRef } = React
const { useNavigate } = ReactRouterDOM

export function MailCompose({ toggleIsNewMsg }) {
    const [newMail, setNewMail] = useState(mailService.getEmptyMail())
    const inputRef = useRef()
    const navigate = useNavigate()

    useEffect(() => {
        console.log('inpref', inputRef);
    }, [])

    function handleChange({ target }) {
        const field = target.name
        const value = target.value
        setNewMail(prevMail => ({ ...prevMail, [field]: value }))
    }

    function onSendMail(ev) {
        ev.preventDefault()
        if (!newMail.to) {
            inputRef.current.focus()
            return
        }

        mailService.save(newMail)
            .then(() => {
                navigate('/mail')
                toggleIsNewMsg()
            })
            .catch(err => {
                console.log('Had issued in Mail sending:', err);
                // showErrorMsg('Can not save car!')
            })

    }

    return (
        <form onSubmit={onSendMail}>
            <h2>New Message</h2>
            <label htmlFor="to">To:</label>
            <input ref={inputRef} onChange={handleChange} type="text" name="to" id="to" />

            <label htmlFor="subject">Subject:</label>
            <input onChange={handleChange} type="text" name="subject" id="subject" />

            <label htmlFor="body">Body:</label>
            <input onChange={handleChange} type="text" name="body" id="body" />

            <button>Send</button>

        </form>
    )
}