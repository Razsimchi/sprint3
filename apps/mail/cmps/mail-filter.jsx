const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM


export function MailFilter({onSetCritera ,critera}){
    
const[criteraToEdit,setCriteraToEdit] = useState(critera)
const navigate = useNavigate()

    useEffect(()=> {
        onSetCritera(criteraToEdit)
    },[criteraToEdit])

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetCritera(criteraToEdit)
    }
    function handleChange({ target }) {
        const field = target.name
        // if (field === 'isRead') {
        //     setCriteraToEdit(prevCritera => !prevCritera.isRead)
        // }
        const value =  target.value
        setCriteraToEdit(prevCritera => ({ ...prevCritera, [field]: value }))
        navigate(`/mail`)
    }
    console.log(criteraToEdit)
    

    return (
        <section className = 'mail-filter ' >
            <form onSubmit = {onSubmitFilter} ><label htmlFor="txt">Search:</label>
                <input onChange={handleChange} name="txt" id="txt" type="search" placeholder="By Subject" /></form>

            <img src = "../../../assets/icons/icons8-inbox-24.png" className="btn btn-inbox" name ="status" value ="inbox" onClick = {handleChange}></img>    
            <img src = "../../../assets/icons/icons8-sent-32.png" className="btn btn-sent" name = "status" value ="sent" onClick = {handleChange}></img>    
            <img src = "../../../assets/icons/icons8-trash-24.png" className="btn btn-trash" name = "status" value ="trash" onClick = {handleChange}></img>   
            {/* <button name = "isRead"  onClick = {handleChange}>Reade</button>     */}
        </section>
    )
}