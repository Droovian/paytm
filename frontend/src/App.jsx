import { Route, Routes, Link } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Dashboard from './pages/Dashboard'
import Money from './pages/Money'
import Navbar from './components/Navbar'

function App() {

  return (
    <div>
        <Navbar/>
        <Routes>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/send' element={<Money/>}/>
        </Routes>
    </div>
  )
}

export default App
