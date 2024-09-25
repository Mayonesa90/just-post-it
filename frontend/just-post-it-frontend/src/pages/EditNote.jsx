import { useEffect,  useRef, useState  } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom"
import UserIcon from '../assets/user-icon.svg'
import NotePostedMessage from '../components/NotePostedMessage'
import MustFillTextField from '../components/MustFillTextField'


export default function EditNote() {

    const location = useLocation()
    const {id} = location.state
    const [note, setNote] = useState('')

    useEffect(() => {
        const fetchNote = async () => {
           try { 
                const res = await fetch(`https://4lrhfx9au9.execute-api.eu-north-1.amazonaws.com/notes/${id}`)
                const data = await res.json()
                
                setNote(data.data[0])
                // setPlaceholder(data.data[0].username)
            } catch (error) {
                setNote('No users found')
                console.log(error)
            }
        }
        fetchNote()
    }, [])
    
    
    //Placeholder functions
    const [placeholder, setPlaceholder] = useState('')
    const [text, setText] = useState('')

    useEffect(() => {
        if(note){
            setPlaceholder(note.username)
            setText(note.text)
        }
    }, [note])

    console.log('placeholder: ', placeholder);
    
    //When clicked 
    function handlePlaceholderClick(){
        setPlaceholder("")
    }

    function handlePlaceholderOutsideClick(){
        if (note) {
            setPlaceholder(note.username)
        }
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
      const [showMessage, setShowMessage] = useState(false)
      const [notePosted, setNotePosted] = useState(false)
      
      const handleInputChange = (event) => {
        
        const { name, value } = event.target;

        setFormData({
          ...formData,
          [name]: value
        });
  
        if(name === "text" && value.length > 0){
            setTextFilled(true)
            if(usernameFilled){
              setShowMessage(false)
            } else {
              setShowMessage(true)
            }
        } else if (name === "text" && value.length === 0){
            setTextFilled(false)
            setShowMessage(true)
        }
        

        if(name === "username" && value.length > 0){
          setUsernameFilled(true)
          if (textFilled){
            setShowMessage(false)
          } else {
            setShowMessage(true)
          }
        } else if (name === 'username' && value.length === 0) {
          setUsernameFilled(false)
          setShowMessage(true)
        }

      };

      const addNote = async (event) => {
        event.preventDefault();

        if(textFilled && usernameFilled){
          try {
            const response = await fetch('https://4lrhfx9au9.execute-api.eu-north-1.amazonaws.com/notes/add-note', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(formData)
            });
            if (response.ok) {
              console.log('Note added successfully');
              setNotePosted(true)
            } else {
              console.error('Failed to add note');
            }
          } catch (error) {
            console.error('Error adding note:', error);
          }
        } else {
          setShowMessage(true)
          console.log("Please fill in the missing field/s before submitting.")
        }
      }
   

    return (
        <div className="wrapper bg-emerald-200 min-h-screen flex flex-col">
            <Link to="/">
                <nav>
                    <button className="bg-purple-300 p-3 font-IBMPlexMono text-xs mt-9 shadow-lg">﹤ BACK TO NOTES</button>
                </nav>
            </Link>
            <form onSubmit={addNote} className='mt-20'>
            <section className="grid max-w-96 mx-auto bg-yellow-200 font-GochiHand pt-6 ">
                <textarea 
                    name="text" 
                    id="text" 
                    placeholder={text}
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
            {showMessage && <MustFillTextField />}
            {notePosted && <NotePostedMessage />}
        </div>
    )
}