import { useState } from 'react'
import Googin from './Componets/Login';
// import TradeProLogin from './Componets/Login/Equity';
import Navbar from './Componets/Navbar';
import About from './Componets/About';
import Market from './Componets/Market';
import Portfolio from './Componets/Portfolio';
import Home from './Componets/Home';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import "./styles/global.css";


//import './App.css'npm install vite --save-dev
//
function App(){
  const [user, setUser] = useState({
   user:'',
   userId: -1,
   isLoggedIn:false

  });
  const handleLogout =()=>{
    setUser({
      user: '',
      userId: -1,
      isLoggedIn: false
    })
  }


  return (
      <>
      <Router>
       {user.isLoggedIn && <Navbar handleLogout={handleLogout} />}
       <Routes>
        <Route path="/" element={user.isLoggedIn ? <Home user={user} onLogout={handleLogout} /> : <Googin setUser={setUser} />} />
        <Route path="/home" element={user.isLoggedIn ? <Home user={user} onLogout={handleLogout} /> : <Googin setUser={setUser} />} />
        <Route path="/about" element={user.isLoggedIn ? <About onLogout={handleLogout} /> : <Googin setUser={setUser} />} />
        <Route path="/market" element={user.isLoggedIn ? <Market /> : <Googin setUser={setUser} />} />
        <Route path="/portfolio" element={user.isLoggedIn ? <Portfolio user={user} /> : <Googin setUser={setUser} />} />
      </Routes>
     </Router>

     </>


  )
}

export default App
