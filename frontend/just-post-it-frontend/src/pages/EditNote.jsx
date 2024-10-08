import { useEffect, useState  } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom"
import UserIcon from '../assets/user-icon.svg'
import DeleteBtn from '../components/DeleteBtn'
import ErrorMessage from '../components/ErrorMessage'
import SuccessMessage from '../components/SuccessMessage'

export default function EditNote() {

      const location = useLocation()
      const {id} = location.state
      const [errorMsg, setErrorMsg] = useState("")
      const [showErrorMsg, setShowErrorMsg] = useState(false)
      const [showSuccessMsg, setShowSuccessMsg] = useState(false)
      const [successMsg, setSuccessMsg] = useState("")
      const [note, setNote] = useState('')
      const [formData, setFormData] = useState({
          text: "",
          username: ""
        })
      const [newText, setNewText] = useState(false)
      const [newUsername, setNewUsername] = useState(false)
      
      //FETCH API

      //Fetch data from api using the id from the landing page
      useEffect(() => {
          const fetchNote = async () => {
            try { 
                  const res = await fetch(`https://4lrhfx9au9.execute-api.eu-north-1.amazonaws.com/notes/${id}`)
                  const data = await res.json()
                  console.log(data);
                  
                  //if the data is an error message it sets the error message text that
                  if(data.errorMessage){ 
                    setErrorMsg(data.errorMessage)
                    setShowErrorMsg(true)
                  //if the data has a note it sets the note to that
                  } else {
                    setNote(data.data) 
                    setShowErrorMsg(false)
                  }
              //if no data is returned it sets the error message to "No note found"
              } catch (error) {
                  setNote('No note found')
                  console.log(error)
              }
          }
          fetchNote()
      }, [])
 
      //Set formData to data fetched from api
      useEffect(() => {
          if(note){
              setFormData({
                  text: note.text,
                  username: note.username
              })
          }
      }, [note])


      //FORM FUNCTIONS

      //Function to handle input change
      const handleInputChange = (event) => {

        //Resets success-message
        setShowSuccessMsg(false)

        //Gets the name and value from the form when function is triggered
        const { name, value } = event.target;
        
        //Check if there is a value in the text input field and if it's not the same as the data from the api
        if (name === "text" && value.length > 0 && value !== note.text){
          //Resets possible error-message
          setErrorMsg("")
          setShowErrorMsg(false)
          //Sets the newText to true so we know that a chnage has been made
          setNewText(true)
          //Sets the form data to that value
          setFormData({
                ...formData,
                [name]: value
              });
        //If you erase all the text from the text field an error message is shown
        } else if (name === "text" && value.length === 0) {
          setNewText(false)
          setErrorMsg("Text field can't be empty")
          setShowErrorMsg(true)
        } 

        //Check if there is a value in the username input field and if it's not the same as the data from the api
        if (name === "username" && value.length > 0 && value !== note.username){
          //Resets possible error-message
          setErrorMsg("")
          setShowErrorMsg(false)
          //Sets the newUsername to true so we know that a chnage has been made
          setNewUsername(true)
          //Sets the form data to that value
          setFormData({
                ...formData,
                [name]: value
              });
        //If you erase all the text from the username field an error message is shown
        } else if (name === "username" && value.length === 0) {
          setNewUsername(false)
          setErrorMsg("Username field can't be empty")
          setShowErrorMsg(true)
        } 

      }   
          
      //Function to post the new data to the api
      const addNote = async (event) => {
        event.preventDefault();

        //Check if either new text OR new username has been entered
        if(newUsername || newText){ 
          
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
              setShowSuccessMsg(true)
              setSuccessMsg('Note edited successfully')
              setErrorMsg("")
              setShowErrorMsg(false)
            } else {
              const errorData = await response.json()
              const errorMessage = JSON.stringify(errorData.errorMessage[0])
              setShowSuccessMsg(false)
              setErrorMsg(errorMessage)
              setShowErrorMsg(true)
              console.error('Failed to edit note');
            }
          } catch (error) {
            setShowSuccessMsg(false)
            setErrorMsg('Error adding note')
            setShowErrorMsg(true)
            console.error('Error editing note:', error);
          }
        //If no new username OR no new text has been added a message shows
        } else if (!newText && !newUsername) { 
          setErrorMsg("No changes made or invalid input")
          setShowErrorMsg(true)
          console.log("No changes made hello")
        } else {
          setErrorMsg("Error")
          setShowErrorMsg(true)
        }
      }
      
      //DELETE FUNCTION
      const deleteNote = async () => { 
        try {
            const response = await fetch(`https://4lrhfx9au9.execute-api.eu-north-1.amazonaws.com/notes/${id}`, {
              method: 'DELETE',
            })
          if (response.ok) {
            setSuccessMsg('Note deleted successfully')
            setShowSuccessMsg(true)
          } else {
            setShowSuccessMsg(false)
            const errorData = await response.json()
            const errorMessage = JSON.stringify(errorData.errorMessage)
            setErrorMsg(errorMessage)
            setShowErrorMsg(true)

          }
        } catch (error) {
            setErrorMsg('Error deleting note')
            setShowErrorMsg(true)
            console.error('Error deleting note:', error);
        }}

    return (
        <div className="wrapper bg-emerald-200 min-h-screen flex flex-col">
          <div className='flex justify-between'>
            <Link to="/">
                <nav>
                    <button className=" bg-purple-300 hover:bg-purple-500 hover:text-white p-3 font-IBMPlexMono text-xs mt-9 shadow-hardShadow">﹤ BACK TO NOTES</button>
                </nav>
            </Link>
            <DeleteBtn onClick={deleteNote}/>
          </div>

          <form onSubmit={addNote} className='mt-20 '>
            <section className="grid max-w-96 mx-auto bg-yellow-200 font-Sunrise">
                <div className=' bg-orange-400 flex font-IBMPlexMono  items-center p-1 mb-2 max-w-fit text-xs '>
                  <img src={UserIcon} alt="" className=' mx-1 h-4' />
                  <input 
                        size={15} 
                        type="text"
                        id="username"
                        name="username" 
                        defaultValue={note.username}
                        onChange={handleInputChange} 
                        className="max-w-52 bg-transparent p-1"/>
                </div>
                <textarea 
                    name="text" 
                    id="text"
                    defaultValue={note.text}
                    onChange={handleInputChange}
                    className="bg-yellow-200 min-h-96 mx-2 mb-2 p-1 tracking-wider "
                >
                </textarea>
                
              </section>
            {newText ? 
              <button type='submit'  className=' font-PassionOne text-4xl bg-green-400 hover:bg-green-600 hover:text-white px-4 pt-1 shadow-hardShadow absolute right-0 mt-8'>
                    POST IT
              </button>
              :
              <button className=' font-PassionOne text-4xl bg-green-400 hover:bg-green-600 px-4 pt-1 hover:text-white shadow-hardShadow absolute right-0 mt-8'>
                    POST IT
              </button>
              }

          </form>
            {showErrorMsg && <ErrorMessage errorMsg={errorMsg} />}
            {showSuccessMsg && <SuccessMessage message={successMsg}/>}
        </div>
    )
}