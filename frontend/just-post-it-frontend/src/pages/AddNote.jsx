import { useEffect } from 'react'
import { useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import UserIcon from '../assets/user-icon.svg'
import {useState} from 'react'

export default function PostByDate() {

    const [placeholder, setPlaceholder] = useState("ENTER USERNAME")

    function handlePlaceholderClick(){
        setPlaceholder("")
    }

    function handlePlaceholderOutsideClick(){
        setPlaceholder("ENTER USERNAME")
    }

    const useOutsideClick = (callback) => {
        const ref = useRef();
    
        useEffect(() => {
          const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
              callback();
            }
          };
    
          document.addEventListener("mousedown", handleClickOutside);
    
          return () => {
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [ref]);
    
        return ref;
      };
    
      const ref = useOutsideClick(handlePlaceholderOutsideClick);

    return (
        <div className="wrapper bg-emerald-200 min-h-screen">
            <Link to="/">
                <nav>
                    <button className="bg-purple-300 p-3 font-IBMPlexMono text-xs mt-9 mb-20 shadow-lg">﹤ BACK TO NOTES</button>
                </nav>
            </Link>
            <section className="grid max-w-96 mx-auto bg-yellow-200 font-GochiHand pt-6 ">
                <textarea 
                    name="text" 
                    id="text" 
                    placeholder="Write your text here.."
                    className="bg-yellow-200 min-h-96 px-9 tracking-wider"
                >
                </textarea>
                <div className="flex justify-self-end mb-5 font-IBMPlexMono text-base p-2 shadow-inner max-w-fit bg-emerald-200 ">
                    <img src={UserIcon} alt="" />
                    <input size={15} ref={ref} onClick={handlePlaceholderClick} type="text" placeholder={placeholder} className="max-w-52 text-right bg-transparent"/>
                </div>
            </section>
        </div>
    )
}