import { useState, useEffect } from 'react'
import NoNotes from './NoNotes'

export default function PostByDate() {

    const [notes, setNotes] = useState([])
    
    useEffect(() => {
        const fetchNotes = async () => {
           try { 
            const res = await fetch('https://4lrhfx9au9.execute-api.eu-north-1.amazonaws.com/notes')
            const data = await res.json()
            setNotes(data.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchNotes()
    }, [])

    if (notes.length === 0) return <NoNotes />

    

    return (
        <div>
            <ul className='grid gap-7 mt-7'>
                {notes.map(note => (
                    <li key={note.id} className='bg-yellow-200 mx-auto w-80 shadow-lg p-4 min-h-36 grid content-between'>
                        <p className=' font-GochiHand text-lg'>{note.text}</p>
                        <p className=' font-IBMPlexMono text-xs text-right right-1 bottom-1'>{note.username} {note.createdAt}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}