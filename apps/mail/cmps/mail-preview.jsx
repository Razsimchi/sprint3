const { Link } = ReactRouterDOM
import { utilService } from "../../../services/util.service.js"
export function MailPreview({ mail }) {
    function getDate() {
        return utilService.getDateFormat(mail.sentAt)
        
    }

    return (
        <tr className = 'mail-preview' onClick ={ <Link to={`/mail/${mail.id}`} >Details</Link>}>
            <td>{mail.from}</td>
            <td>{mail.subject}-{mail.body}</td>
            <td>{getDate()}</td>
        </tr>
    )
}
