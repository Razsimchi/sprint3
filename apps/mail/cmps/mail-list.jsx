import { MailPreview } from "./mail-preview.jsx"
export function MailList({mails}) {

    return <table border="1">
        <tbody>
            {mails.map(mail => <MailPreview key={mail.id} mail={mail} />)}
        </tbody>
    </table>
}


