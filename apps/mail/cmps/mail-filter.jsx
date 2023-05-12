const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM


export function MailFilter({onSetCritera ,critera}){
    
const[criteraToEdit,setCriteraToEdit] = useState(critera)
const navigate = useNavigate()

    useEffect(()=> {
        onSetCritera(criteraToEdit)
    },[criteraToEdit])

    function handleChange({ target }) {
        const field = target.name
        const value =  target.value
        if (field === 'isStared') setCriteraToEdit(prevCritera => ({ ...prevCritera, [field]: !prevCritera[field] }))
        else setCriteraToEdit(prevCritera => ({ ...prevCritera, [field]: value }))
        navigate(`/mail`)
    }
    
    console.log(criteraToEdit)
    

    return (
        <section className = 'mail-filter flex justify-center align-center column ' >
            <button title = "Inbox" className="btn btn-inbox" name ="status" value ="inbox" onClick = {handleChange}><i className="fa-solid fa-inbox"></i></button>    
            <button title = "Sent" className="btn btn-sent" name = "status" value ="sent" onClick = {handleChange}><i className="fa-regular fa-paper-plane"></i></button>    
            <button title = "Trash" className="btn btn-trash"  name = "status" value ="trash" onClick = {handleChange}><i className="fa-regular fa-trash-can"></i></button>   
            <button title = "Star" className="btn btn-str"  name = "isStared" value="star" onClick = {handleChange}><i className="fa-regular fa-star"></i></button>   

        </section>
    )
}