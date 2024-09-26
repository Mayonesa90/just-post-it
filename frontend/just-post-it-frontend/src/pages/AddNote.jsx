import { useEffect,  useRef, useState  } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import UserIcon from '../assets/user-icon.svg'
import NotePostedMessage from '../components/NotePostedMessage'
import ErrorMessage from '../components/ErrorMessage'


export default function AddNote() {

    //Placeholder functions
    const [placeholder, setPlaceholder] = useState("ENTER USERNAME")

    //When clicked 
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

      const [textFilled, setTextFilled] = useState(false)
      const [usernameFilled, setUsernameFilled] = useState(false)
      const [notePosted, setNotePosted] = useState(false)
      const [errorMsg, setErrorMsg] = useState()
      const [showErrorMsg, setShowErrorMsg] = useState(false)
      
      const handleInputChange = (event) => {
        
        const { name, value } = event.target;

        setFormData({
          ...formData,
          [name]: value
        });
  
        if(name === "text" && value.length > 0){
            setTextFilled(true)
            if(usernameFilled){
              setShowErrorMsg(false)
            } else {
              setErrorMsg
            }
        } else if (name === "text" && value.length === 0){
            setTextFilled(false)
            setShowErrorMsg(true)
        }
        

        if(name === "username" && value.length > 0){
          setUsernameFilled(true)
          if (textFilled){
            setShowErrorMsg(false)
          } else {
            setShowErrorMsg(true)
          }
        } else if (name === 'username' && value.length === 0) {
          setUsernameFilled(false)
          setShowErrorMsg(true)
        }

      };

      const addNote = async (event) => {
        event.preventDefault();

        if(textFilled && usernameFilled){
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
              setNotePosted(true)
              setErrorMsg("")
              setShowErrorMsg(false)
            } else {
              const errorData = await response.json()
              const errorMessage = JSON.stringify(errorData.errorMessage[0])
              setErrorMsg(errorMessage)
              setShowErrorMsg(true)
              console.log(errorMessage);
              
            }
          } catch (error) {
            console.error('Error adding note:', error);
            setErrorMsg("Error adding note")
            setShowErrorMsg(true)
          }
        } else {
          setShowMessage(true)
          setErrorMsg("Please fill in the missing field/s before submittin")
          setShowErrorMsg(true)
          console.log("Please fill in the missing field/s before submitting.")
        }
      }
   

    return (
        <div className="wrapper bg-emerald-200 min-h-screen flex flex-col">
            <Link to="/">
                <nav>
                    <button className="bg-purple-300 hover:bg-purple-500 hover:text-white  p-3 font-IBMPlexMono text-xs mt-9 shadow-lg">﹤ BACK TO NOTES</button>
                </nav>
            </Link>
            <form onSubmit={addNote} className='mt-20'>
            <section className="grid max-w-96 mx-auto bg-yellow-200 font-Sunrise">
                <div className=' bg-orange-400 flex font-IBMPlexMono  items-center p-1 mb-2 max-w-fit text-xs '>
                  <img src={UserIcon} alt="" className=' mx-1 h-4' />
                  <input 
                        size={15} 
                        type="text"
                        id="username"
                        name="username" 
                        placeholder={placeholder}
                        onChange={handleInputChange} 
                        onClick={handlePlaceholderClick}
                        className="max-w-52 bg-transparent p-1 "/>
                </div>
                <textarea 
                    name="text" 
                    id="text" 
                    placeholder="Write your text here.."
                    onChange={handleInputChange}
                    className="bg-yellow-200 min-h-96 mx-2 mb-2 p-1 tracking-wider"
                >
                </textarea>
                
            </section>
            {textFilled ? 
              <button type='submit'  className=' font-PassionOne text-4xl bg-green-400 px-4 pt-1 shadow-md absolute right-0 mt-8'>
                    POST IT
              </button>
              :
              <button className=' font-PassionOne text-4xl bg-green-400 px-4 pt-1 shadow-md absolute right-0 mt-8'>
                    POST IT
              </button>
              }

            </form>
            {notePosted && <NotePostedMessage />}
            {showErrorMsg && <ErrorMessage errorMsg={errorMsg} />}
        </div>
    )
}