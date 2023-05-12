import { MailPreview } from "./mail-preview.jsx"
export function MailList({mails , onRemoveMail ,  onStarOrMail}) {

    return <table className = "mail-list" border="1">
        <tbody>
            {mails.map(mail => <MailPreview key={mail.id} mail={mail} onStarOrMail={onStarOrMail} onRemoveMail={onRemoveMail} />)}
        </tbody>
    </table>
}


