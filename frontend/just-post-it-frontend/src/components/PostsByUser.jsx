import { useState, useEffect } from 'react'
import NoNotes from './NoNotes'
import EditBtn from './EditBtn'

export default function PostsByUser({user}) {

    const [notes, setNotes] = useState([])
    const [hoveringId, setHoveringId] = useState(null)

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await fetch(`https://4lrhfx9au9.execute-api.eu-north-1.amazonaws.com/notes/users/${user}`)
                const data = await res.json()
                setNotes(data.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchNotes()
    }, [user])

    return (
        <div>
            <ul className='grid gap-7 mt-7'>
                {notes? notes.map(note => (
                <li key={note.id} 
                onMouseEnter={() => setHoveringId(note.id)} 
                onMouseLeave={() => setHoveringId(null)} 
                className='bg-yellow-200 mx-auto shadow-lg relative content-between min-w-80'>
                    <h1 className=' font-IBMPlexMono text-xs bg-orange-400 shadow-md w-fit p-2'>{note.username}:</h1>
                    <article className='font-Sunrise p-3 text-wrap'>
                        <p>{note.text}</p>
                    </article>
                    <footer className='grid relative right-1 bottom-1 p-3 text-right text-xs opacity-70 font-IBMPlexMono'>
                        <p>Posted: {note.createdAt}</p>
                        { note.updatedAt ? <p className=' text-blue-700'>Edited: {note.updatedAt}</p> : <></>}
                        
                    </footer>
                    {hoveringId === note.id && <EditBtn id={note.id} />}  
                </li>
                )) : <NoNotes />}
            </ul>
        </div>
    )

}