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
                    <li key={note.id} onMouseEnter={() => setHoveringId(note.id)} onMouseLeave={() => setHoveringId(null)} className='bg-yellow-200 mx-auto w-80 shadow-lg min-h-36 grid content-between hover:border-solid hover:border-blue-700 hover:border-2'>
                        <p className=' font-GochiHand text-lg p-3'>{note.text}</p>
                        <p className=' font-IBMPlexMono text-xs text-right right-1 bottom-1 p-3'>{note.username} {note.createdAt}</p>
                        {hoveringId === note.id && <EditBtn />}
                    </li>
                )) : <NoNotes />}
            </ul>
        </div>
    )

}