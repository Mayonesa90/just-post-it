import { useState } from 'react'
import AddIcon from '../assets/add-icon.svg'
import SortDateIcon from '../assets/sort-date-icon.svg'
import SortUserIcon from '../assets/sort-user-icon.svg'
import PostByDate from '../components/PostsByDate'
import PostByUser from '../components/PostsByUser'


export default function Landing(){

const [sorting, setSorting] = useState('Date')

function SortingUpdater(){
    if(sorting === 'Date'){
        return <PostByDate />
    }else if(sorting === 'User'){
        return <PostByUser />
    }
}

    return(
        <div className="wrapper bg-emerald-200 min-h-screen">
            <header className="pt-16 pb-5">
                <h1 className=" text-4xl text-center font-PassionOne ">JUST POST IT</h1>
                <nav className=" absolute right-0 top-14 p-3 bg-green-400 flex gap-2  shadow-xl">
                    <img src={AddIcon} alt="" className='' />
                    <a href="" className=' font-IBMPlexMono'>ADD NOTE</a>
                </nav>
            </header>
            <section className='max-w-sm mx-auto flex justify-evenly font-IBMPlexMono'>
                <button
                    onClick={() => setSorting('Date')} 
                    className='flex items-center gap-3'>
                        <img src={SortDateIcon} alt="" />
                        <p>SORT BY DATE</p>
                </button>
                <button
                    onClick={() => setSorting('User')}  
                    className='flex items-center gap-3'>
                        <img src={SortUserIcon} alt="" />
                        <p>SORT BY USER</p>
                </button>
            </section>
            <SortingUpdater />
        </div>
    )
}