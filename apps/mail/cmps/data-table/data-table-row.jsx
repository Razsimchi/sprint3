import { utilService } from "../../../../services/util.service.js"

export function DataTableRow({ mail }) {
    function getDate() {
        return utilService.getDateFormat(mail.sentAt)
        
    }

    return (
        <tr>
            <td>{mail.from}</td>
            <td>{mail.subject}-{mail.body}</td>
            <td>{getDate()}</td>
        </tr>
    )
}
