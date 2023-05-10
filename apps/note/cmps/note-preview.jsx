const { Link } = ReactRouterDOM


export function NotePreview({ note }) {
    const{info,type,style}=note
    
    console.log(note);
if(type==='NoteTxt'){
    return (
        <article style={style} className="note-preview">
            <h2>{info.txt}</h2>
        </article>  
    )
}
if(type==='NoteImg'){
    return (
        <article style={style} className="note-preview">
            <h2>{info.title}</h2>
        </article>
    )
}
if(type==='NoteTodos'){
    return (
        <article style={style} className="note-preview">
            <h2>{info.title}</h2>
        </article>
    )
}
}