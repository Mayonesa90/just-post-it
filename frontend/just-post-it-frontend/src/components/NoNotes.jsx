import TumbleweedIcon from '../assets/tumbleweed.svg'

export default function NoNotes(){

    return (
        <>
            <img src={TumbleweedIcon} alt="" className='mx-auto mt-40 animate-bounce'/>
            <p className=' font-GochiHand text-base text-center mt-4'>No notes yet...</p>
            </>
        
    )
}