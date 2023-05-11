import { DataTableRow } from "./data-table-row.jsx"

export function DataTable({ mails }) {

    return <table border="1">
        <tbody>
            {mails.map(mail => <DataTableRow key={mail.id} mail={mail} />)}
        </tbody>
    </table>
}
