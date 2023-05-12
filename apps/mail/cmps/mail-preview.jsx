const { useNavigate } = ReactRouterDOM
import { utilService } from "../../../services/util.service.js"
export function MailPreview({ mail, onRemoveMail, onStarOrMail }) {
    const navigate = useNavigate()
    const bgc = mail.isRead ? 'read' : ''


    function getDate() {
        return utilService.getDateFormat(mail.sentAt)
    }
    function getUsernameFromEmail(mail) {
        const atIndex = mail.indexOf('@');
        if (atIndex === -1) {
          return '';
        }
        return mail.substring(0, atIndex);
      }

    return (

        <tr onClick={() => {
            navigate(`/mail/${mail.id}`)
            onStarOrMail(mail.id, 'isRead')
        }
        } className={`mail-preview ${bgc}`} >
            <td onClick={(event) => {
                event.stopPropagation()
                onStarOrMail(mail.id, 'isStared')
            }}>
                <button className="btn">{(mail.isStared) ? <i className="fa-solid fa-star" style={{ color: "#fbff00" }}></i>
                    : <i className="fa-regular fa-star"></i>}</button></td>
            <td className="from">{getUsernameFromEmail(mail.from)}</td>
            <td>{mail.subject}-{mail.body}</td>
            <td className="date">{getDate()}</td>
            <td className="preview-icon" ><i onClick={(event) => {
                event.stopPropagation()
                onRemoveMail(mail.id)
            }} className="fa-regular fa-trash-can"></i>

                {(mail.isRead) ? <i title="Set as unread" onClick={(event) => {
                    event.stopPropagation()
                    onStarOrMail(mail.id, 'isRead')
                }} class="fa-regular fa-envelope"></i>
                    : <i title="Set as read" onClick={(event) => {
                        event.stopPropagation()
                        onStarOrMail(mail.id, 'isRead')
                    }} class="fa-regular fa-envelope-open"></i>}</td>
        </tr>

    )
}
