import DeleteIcon from '../assets/delete-icon.svg'

export default function DeleteBtn({onClick}) {
    
    return (
        <button 
            onClick={onClick}
            className="   place-items-center p-3 bg-red-400 hover:bg-red-600 flex gap-2 mt-9  shadow-xl h-fit">
            <img src={DeleteIcon} alt="" className='w-3' />
            <p href="" className=' font-IBMPlexMono text-xs text-white'>DELETE</p>
        </button>
    )
}