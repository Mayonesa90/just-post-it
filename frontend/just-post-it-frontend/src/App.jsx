import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import AddNote from './pages/AddNote';
import EditNote from './pages/EditNote';

function App() {


  return (
    <Routes>
      <Route path="/" element={ <Landing /> }></Route>
      <Route path="/notes/add-note" element={ <AddNote /> }></Route>
      <Route path="/notes/edit" element={ <EditNote /> }></Route>
    </Routes>
  )
}

export default App
