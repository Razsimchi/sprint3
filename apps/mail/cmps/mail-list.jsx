import { MailPreview } from "./mail-preview.jsx"
export function MailList({mails , onRemoveMail ,  onStarOrMail}) {

    if (mails.length === 0) return <h2>No emails yet</h2>
    return <table className = "mail-list" border="1">
        <tbody>
            {mails.map(mail => <MailPreview key={mail.id} mail={mail} onStarOrMail={onStarOrMail} onRemoveMail={onRemoveMail} />)}
        </tbody>
    </table>
}


