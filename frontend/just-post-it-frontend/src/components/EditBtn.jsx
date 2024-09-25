import EditIcon from '../assets/edit-icon.svg'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"

export default function EditBtn ({id}) {
    console.log({id});
    
    
    return (
        <Link to='/notes/edit' className=' absolute justify-self-end '>
            <button 
                className=' flex gap-2 font-IBMPlexMono text-xs place-items-center bg-blue-400 hover:bg-blue-600 text-white p-1'
            >
            <img src={EditIcon} alt="edit icon" className='w-3'  />
            <p>EDIT</p>
        </button>
        </Link>

    )
}