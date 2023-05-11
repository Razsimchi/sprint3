const { useNavigate } = ReactRouterDOM
import { utilService } from "../../../services/util.service.js"
export function MailPreview({ mail, onRemoveMail }) {
    const navigate = useNavigate()

    function getDate() {
        return utilService.getDateFormat(mail.sentAt)

    }
    return (

        <tr onClick={() => navigate(`/mail/${mail.id}`)} className='mail-preview' >
            <td onClick={(event) => {
                event.stopPropagation()
                onRemoveMail(mail.id)
            }}> 
            <img className="btn" src="../../../assets/icons/icons8-star-24.png"  /></td>
            <td>{mail.from}</td>
            <td>{mail.subject}-{mail.body}</td>
            <td className="date">{getDate()}</td>
            <td><img className="btn preview-icon"  src="../../../assets/icons/icons8-trash-24.png" alt="" /></td>
        </tr>

    )
}
