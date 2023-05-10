const { useNavigate } = ReactRouterDOM
import { utilService } from "../../../services/util.service.js"
export function MailPreview({ mail, onRemoveMail }) {
    const navigate = useNavigate()

    function getDate() {
        return utilService.getDateFormat(mail.sentAt)

    }
    // `/mail/${mail.id}`
    return (

        <tr onClick={() => navigate(`/mail/${mail.id}`)} className='mail-preview' >
            <button onClick={(event) => {
                event.stopPropagation()
                onRemoveMail(mail.id)
            }
            }
            > Delete</button>

            <td>{mail.from}</td>
            <td>{mail.subject}-{mail.body}</td>
            <td>{getDate()}</td>
        </tr>

    )
}
