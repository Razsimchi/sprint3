import { MailPreview } from "./mail-preview.jsx"
export function MailList({mails , onRemoveMail}) {

    return <table border="1">
        <tbody>
            {mails.map(mail => <MailPreview key={mail.id} mail={mail} onRemoveMail={onRemoveMail} />)}
        </tbody>
    </table>
}


