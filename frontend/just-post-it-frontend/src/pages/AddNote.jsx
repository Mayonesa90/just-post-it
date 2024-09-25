import { useEffect,  useRef, useState  } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import UserIcon from '../assets/user-icon.svg'


export default function PostByDate() {

    //Placeholder functions
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
  
      //Form functions
      const [formData, setFormData] = useState({
        text: "",
        username: ""
      })
      
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value
        });
      
      };
      
      const addNote = async (event) => {

        event.preventDefault();

        try {
          const response = await fetch('https://4lrhfx9au9.execute-api.eu-north-1.amazonaws.com/notes/add-note', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
          if (response.ok) {
            console.log('Note added successfully');
            // Optionally, you can redirect the user or perform additional actions
          } else {
            console.error('Failed to add note');
          }
        } catch (error) {
          console.error('Error adding note:', error);
        }
        
      };

      function Submit(){
        return  <button type='submit'  className=' font-PassionOne text-4xl bg-green-400 px-4 pt-1 shadow-md absolute right-0 mt-8'>
                    POST IT
                </button>
    
      }


    return (
        <div className="wrapper bg-emerald-200 min-h-screen">
            <Link to="/">
                <nav>
                    <button className="bg-purple-300 p-3 font-IBMPlexMono text-xs mt-9 mb-20 shadow-lg">﹤ BACK TO NOTES</button>
                </nav>
            </Link>
            <form onSubmit={addNote}>
            <section className="grid max-w-96 mx-auto bg-yellow-200 font-GochiHand pt-6 ">
                <textarea 
                    name="text" 
                    id="text" 
                    placeholder="Write your text here.."
                    onChange={handleInputChange}
                    className="bg-yellow-200 min-h-96 px-9 tracking-wider"
                >
                </textarea>
                <div className="flex justify-self-end mb-5 font-IBMPlexMono text-base p-2 shadow-inner max-w-fit bg-emerald-200 ">
                    <img src={UserIcon} alt="" className=' mr-2' />
                    <input 
                      size={15} 
                      ref={ref} 
                      onClick={handlePlaceholderClick} 
                      type="text"
                      id="username"
                      name="username" 
                      placeholder={placeholder}
                      onChange={handleInputChange} 
                      className="max-w-52 bg-transparent"/>
                </div>
            </section>
            <button type='submit'  className=' font-PassionOne text-4xl bg-green-400 px-4 pt-1 shadow-md absolute right-0 mt-8'>
                    POST IT
              </button>
            </form>
        </div>
    )
}