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
        const value =  target.value
        setCriteraToEdit(prevCritera => ({ ...prevCritera, [field]: value }))
    }
    console.log(criteraToEdit)

    return (
        <section className = 'mail-filter' >
            <form onSubmit = {onSubmitFilter} ><label htmlFor="txt">Search:</label>
                <input onChange={handleChange} name="txt" id="txt" type="search" placeholder="By Subject" /></form>
        </section>
    )
}