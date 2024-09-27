import { useEffect,  useRef, useState  } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import UserIcon from '../assets/user-icon.svg'
import ErrorMessage from '../components/ErrorMessage'
import SuccessMessage from '../components/SuccessMessage'

export default function AddNote() {

    //Placeholder functions so placeholder text changes when clicked inside
    //and restored when clicked outside
    const [placeholder, setPlaceholder] = useState("ENTER USERNAME")
    const [textPlaceHolder, setTextPlaceholder] = useState('Whats on your mind today?')

    //When clicked inside
    function handlePlaceholderClick(){
        setPlaceholder("")
    }
    function handleTextPlaceholderClick(){
        setTextPlaceholder("")
    }

    //When clicked outside
    function handlePlaceholderOutsideClick(){
        setPlaceholder("ENTER USERNAME")
    }
    function handleTextPlaceholderOutsideClick(){
        setTextPlaceholder('Whats on your mind today?')
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
    
      const inputRef = useOutsideClick(handlePlaceholderOutsideClick);
      const textInputRef = useOutsideClick(handleTextPlaceholderOutsideClick);
  
      //Form functions
      const [formData, setFormData] = useState({
        text: "",
        username: ""
      })

      const [textFilled, setTextFilled] = useState(false)
      const [usernameFilled, setUsernameFilled] = useState(false)
      const [errorMsg, setErrorMsg] = useState()
      const [showErrorMsg, setShowErrorMsg] = useState(false)
      const [successMsg, setSuccessMsg] = useState("")
      const [showSuccessMsg, setShowSuccessMsg] = useState(false)
      
      const handleInputChange = (event) => {
        setShowSuccessMsg(false)
        const { name, value } = event.target;

        //Check if there is a value in the text input field and if it's not the same as the data from the api
        if (name === "text" && value.length > 0){
          setErrorMsg("")
          setShowErrorMsg(false)
          setTextFilled(true)
          setFormData({
                ...formData,
                [name]: value
              });
        } else if (name === "text" && value.length === 0) {
          setTextFilled(false)
          setErrorMsg("Text field can't be empty")
          setShowErrorMsg(true)
        } 

        //Check if there is a value in the username input field and if it's not the same as the data from the api
        if (name === "username" && value.length > 0){
          setErrorMsg("")
          setShowErrorMsg(false)
          setUsernameFilled(true)
          setFormData({
                ...formData,
                [name]: value
              });
        } else if (name === "username" && value.length === 0) {
          setUsernameFilled(false)
          setErrorMsg("Username field can't be empty")
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
              setShowSuccessMsg(true)
              setSuccessMsg('Note added successfully')
              setShowErrorMsg(false)
            } else {
              const errorData = await response.json()
              const errorMessage = JSON.stringify(errorData.errorMessage[0])
              setErrorMsg(errorMessage)
              setShowErrorMsg(true)

            }
          } catch (error) {
            console.error('Error adding note:', error);
            setErrorMsg("Error adding note")
            setShowErrorMsg(true)
          }
        } else {
          setErrorMsg("Please fill in the missing field/s before submitting")
          setShowErrorMsg(true)
          console.log("Please fill in the missing field/s before submitting.")
        }
      }
   

    return (
        <div className="wrapper bg-emerald-200 min-h-screen flex flex-col">
            <Link to="/">
                <nav>
                    <button className="bg-purple-300 hover:bg-purple-500 hover:text-white  p-3 font-IBMPlexMono text-xs mt-9 shadow-hardShadow">﹤ BACK TO NOTES</button>
                </nav>
            </Link>
            <form onSubmit={addNote} className='mt-20'>
            <section className="grid max-w-96 mx-auto bg-yellow-200 font-Sunrise">
                <div className=' bg-orange-400 flex font-IBMPlexMono  items-center p-1 mb-2 max-w-fit text-xs '>
                  <img src={UserIcon} alt="" className=' mx-1 h-4' />
                  <input 
                        ref={inputRef}
                        size={15} 
                        type="text"
                        id="username"
                        name="username" 
                        placeholder={placeholder}
                        onChange={handleInputChange} 
                        onClick={handlePlaceholderClick}
                        className="max-w-52 bg-transparent p-1 placeholder:text-gray-800 "/>
                </div>
                <textarea
                    ref={textInputRef} 
                    name="text" 
                    id="text" 
                    placeholder={textPlaceHolder}
                    onChange={handleInputChange}
                    onClick={handleTextPlaceholderClick}
                    className="bg-yellow-200 placeholder:text-gray-800 min-h-96 mx-2 mb-2 p-1 tracking-wider"
                >
                </textarea>
                
            </section>
            {textFilled ? 
              <button type='submit'  className=' font-PassionOne text-4xl bg-green-400 hover:bg-green-600 hover:text-white px-4 pt-1 shadow-hardShadow absolute right-0 mt-8'>
                    POST IT
              </button>
              :
              <button className=' font-PassionOne text-4xl bg-green-400 hover:bg-green-600 px-4 pt-1 hover:text-white shadow-hardShadow absolute right-0 mt-8'>
                    POST IT
              </button>
              }

            </form>
            {showSuccessMsg && <SuccessMessage message={successMsg}/>}
            {showErrorMsg && <ErrorMessage errorMsg={errorMsg} />}
        </div>
    )
}