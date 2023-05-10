const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM


export function MailDetails() {
    const [mail, setMail] = useState(null)
    const [nextMailId, setNextMailId] = useState(null)
    const { mailId } = useParams()
    const navigate = useNavigate()
}

useEffect(() => {
    loadMail()
    loadNextMailId()
}, [mailId])

function loadMail() {
    mailService.get(mailId)
        .then(setMail)
        .catch(err => {
            console.log('Had issued in mail details:', err);
            navigate('/mail')
        })
}
function loadNextMailId() {
    mailService.getNextMailId(mailId)
        .then(setNextMailId)
}
// function onBack() {
//     navigate('/mail')
// }
// if (!mail) return <div>loading...</div>
// return (
//     <section className="mail-details">
        
//     </section>
// )
