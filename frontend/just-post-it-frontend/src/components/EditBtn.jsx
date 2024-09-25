import EditIcon from '../assets/edit-icon.svg'

export default function EditBtn () {
    return (
        <button 
            className=' flex gap-2 font-IBMPlexMono text-s absolute justify-self-end bg-blue-400 hover:bg-blue-600 text-white p-1'
        >
            <img src={EditIcon} alt="edit icon" className='w-5'  />
            EDIT
        </button>
    )
}