import { useState } from 'react'
import Googin from './Componets/Login';
// import TradeProLogin from './Componets/Login/Equity';
import Navbar from './Componets/Navbar';
import About from './Componets/About';
import Market from './Componets/Market';
import Portfolio from './Componets/Portfolio';
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
  const handLeLogout =()=>{
    setUser({
      user: '',
      userId: -1,
      isLoggedIn: false
    })
  }


  return (
      <>
      <Router>
       {user.isLoggedIn && <Navbar handLeLogout={handLeLogout} />}
       <Routes>
         <Route path="/About" element={user.isLoggedIn ? <About /> : <Googin setUser={setUser} />} />
         <Route path="/" element={user.isLoggedIn ? <Portfolio /> : <Googin setUser={setUser} />} />
         <Route path="/Market" element={user.isLoggedIn ? <Market /> : <Googin setUser={setUser} />} />
         <Route path="/Portfolio" element={user.isLoggedIn ? <Portfolio /> : <Googin setUser={setUser} />} />
       </Routes>
     </Router>

     </>


  )
}

export default App
