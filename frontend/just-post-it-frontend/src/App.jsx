import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import AddNote from './pages/AddNote';

function App() {


  return (
    <Routes>
      <Route path="/" element={ <Landing /> }></Route>
      <Route path="/notes/add-note" element={ <AddNote /> }></Route>
    </Routes>
  )
}

export default App
