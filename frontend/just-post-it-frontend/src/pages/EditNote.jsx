import { useEffect,  useRef, useState  } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom"
import UserIcon from '../assets/user-icon.svg'
import NotePostedMessage from '../components/NotePostedMessage'
import NoEditsMessage from '../components/NoEditsMessage'


export default function EditNote() {

    const location = useLocation()
    const {id} = location.state
    const [note, setNote] = useState('')
    const [placeholder, setPlaceholder] = useState('')
    const [text, setText] = useState('')
    const [formData, setFormData] = useState({
        text: "",
        username: ""
      })

    useEffect(() => {
        const fetchNote = async () => {
           try { 
                const res = await fetch(`https://4lrhfx9au9.execute-api.eu-north-1.amazonaws.com/notes/${id}`)
                const data = await res.json()
                
                setNote(data.data[0])
            } catch (error) {
                setNote('No users found')
                console.log(error)
            }
        }
        fetchNote()
    }, [])
 
    
    useEffect(() => {
        if(note){
            setPlaceholder(note.username)
            setText(note.text)
            setFormData({
                text: note.text,
                username: note.username
            })
        }
    }, [note])


      //Form functions
      const [textFilled, setTextFilled] = useState(false)
      const [usernameFilled, setUsernameFilled] = useState(false)
      const [showMessage, setShowMessage] = useState(false)
      const [notePosted, setNotePosted] = useState(false)
      const [newText, setNewText] = useState(false)
      const [newUsername, setNewUsername] = useState(false)
      
      const handleInputChange = (event) => {
        
        const { name, value } = event.target;
  
        if(name === "text" && value.length > 0 && value !== note.text){
              setNewText(true)
              setFormData({
              ...formData,
              [name]: value
            });
            
            if(!newText){
              setShowMessage(true)
            } else {
              setShowMessage(false)
            }
            
        } 

        if(name === "username" && value.length > 0 && value !== note.username){
              setNewUsername(true)
              setFormData({
              ...formData,
              [name]: value
            });
        }
        
      };

      const addNote = async (event) => {
        event.preventDefault();

        if(newText || newUsername){ 
          try {
            const response = await fetch(`https://4lrhfx9au9.execute-api.eu-north-1.amazonaws.com/notes/${id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(formData)
            });
            if (response.ok) {
              console.log('Note edited successfully');
              setNotePosted(true)
            } else {
              console.error('Failed to edit note');
            }
          } catch (error) {
            console.error('Error editing note:', error);
          }
        } else {
          setShowMessage(true)
          console.log("No changes made")
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
                    defaultValue={note.text}
                    onChange={handleInputChange}
                    className="bg-yellow-200 min-h-96 px-9 tracking-wider"
                >
                </textarea>
                <div className="flex justify-self-end mb-5 font-IBMPlexMono text-base p-2 shadow-inner max-w-fit bg-emerald-200 ">
                    <img src={UserIcon} alt="" className=' mr-2' />
                    <input 
                      size={15} 
                      type="text"
                      id="username"
                      name="username" 
                      defaultValue={note.username}
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
            {showMessage && <NoEditsMessage />}
            {notePosted && <NotePostedMessage />}
        </div>
    )
}