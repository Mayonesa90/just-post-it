import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import AddIcon from '../assets/add-icon.svg'
import SortDateIcon from '../assets/sort-date-icon.svg'
import SortUserIcon from '../assets/sort-user-icon.svg'
import PostByDate from '../components/PostsByDate'
import PostByUser from '../components/PostsByUser'
import BlurredLine from '../components/BlurredLine'

export default function Landing(){

    const [sorting, setSorting] = useState('Date')
    const [usernames, setUsernames] = useState([])
    const [user, setUser] = useState('')

    function SortingUpdater(){
        if(sorting === 'Date'){
            return <PostByDate />
        }else if(sorting === 'User'){
            return <PostByUser user={user}/>
        }
    }

    useEffect(() => {
        try {
            const fetchUsers = async () => {
                const res = await fetch('https://4lrhfx9au9.execute-api.eu-north-1.amazonaws.com/notes/users')
                const data = await res.json()
                setUsernames(data.data)
            }
            fetchUsers()
            
            
        } catch (error) {
            setUsernames('No users found')
            console.log(error)
        }
    }, [])

    function handleClick(event){
        const selectedUser = event.target.value;
        setSorting('User')
        setUser(selectedUser)
        if(!selectedUser){
            setSorting('Date')
        }
    }


    return(
        <div className="wrapper bg-emerald-200 min-h-screen">
            <header className="pt-16 pb-5">
                <h1 className=" text-4xl text-center font-PassionOne ">JUST POST IT</h1>
                <Link to='/notes/add-note'>
                    <nav className=" absolute right-0 top-10 p-3 bg-green-400 hover:bg-green-600  hover:text-white flex gap-2  shadow-xl">
                        <img src={AddIcon} alt="" className='' />
                        <p href="" className=' font-IBMPlexMono text-xs'>ADD NOTE</p>
                    </nav>
                </Link>

            </header>
            <section className='max-w-sm mx-auto flex justify-evenly font-IBMPlexMono'>
                <div>
                    <button
                        onClick={() => setSorting('Date')} 
                        className='flex items-center gap-2'>
                            <img src={SortDateIcon} alt="" />
                            SORT BY DATE
                    </button>
                    {sorting === 'Date' ? <BlurredLine/> : <></>}
                </div>
                <div>
                    <button className='flex items-center gap-2'>
                        <img src={SortUserIcon} alt="" />
                        <select 
                            name="username" 
                            id="username" 
                            className=' bg-transparent'
                            onChange={handleClick}
                        >
                                <option value="">
                                    SORT BY USER
                                </option>

                            {usernames ? usernames.map((username, index) => (
                                <option 
                                    key={index} 
                                    value={username}
                                >
                                    {username}
                                </option>
                            )) : <option value="">No users found</option>}
                        </select>
                    </button>
                    {sorting === 'User' ? <BlurredLine /> : <></>}
                </div>
               
                
            </section>
            <SortingUpdater />
        </div>
    )
}