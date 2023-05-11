const { useEffect, useState } = React


export function MailFilter({onSetCritera ,critera}){
    
const[criteraToEdit,setCriteraToEdit] = useState(critera)

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
    }
    console.log(criteraToEdit)
    

    return (
        <section className = 'mail-filter' >
            <form onSubmit = {onSubmitFilter} ><label htmlFor="txt">Search:</label>
                <input onChange={handleChange} name="txt" id="txt" type="search" placeholder="By Subject" /></form>

            <button name ="status" value ="inbox" onClick = {handleChange}>Inbox</button>    
            <button name = "status" value ="sent" onClick = {handleChange}>Sent</button>    
            <button name = "status" value ="trash" onClick = {handleChange}>Deleted</button>    
            {/* <button name = "isRead"  onClick = {handleChange}>Reade</button>     */}
        </section>
    )
}