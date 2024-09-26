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
                                        className='bg-yellow-200 mx-auto shadow-lg h-fit relative content-between min-w-80'>
                                            <p className=' font-GochiHand text-lg p-3 h-fit break-words max-w-80'>{note.text}</p>
                                            <div className='grid relative right-1 bottom-1 p-3 text-right text-xs font-IBMPlexMono'>
                                                <p><strong>{note.username}</strong> {note.createdAt}</p>
                                                { note.updatedAt ? <p className=' text-blue-700'>Edited: {note.updatedAt}</p> : <></>}
                                                
                                            </div>
                                            {hoveringId === note.id && <EditBtn id={note.id} />}  
                                    </li>
                )) : <NoNotes />}
            </ul>
        </div>
    )

}