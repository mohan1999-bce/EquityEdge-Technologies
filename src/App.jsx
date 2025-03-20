import { useState } from 'react'
import Login from './Componets/Login/login';
import Googin from './Componets/Login/sample';
import TradeProLogin from './Componets/Login/Equity';
import Navbar from './Componets/Login/Navbar';
import About from './Componets/Login/About';
import Market from './Componets/Login/Market';
import Portfolio from './Componets/Login/Portfolio';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';


//import './App.css'npm install vite --save-dev
//
function App(){
  const [user, setUser] = useState({
   user:'',
   isLoggedIn:false

  });
  const handLeLogout =()=>{
    setUser((prevState)=>({

      ...prevState,
      isLoggedIn:false
    }));
  }


  return (
      <>
      <Router>
       {user.isLoggedIn && <Navbar handLeLogout={handLeLogout} />}
       <Routes>
         <Route path="/About" element={user.isLoggedIn ? <About /> : <Googin setUserInParentComponent={setUser} />} />
         <Route path="/" element={user.isLoggedIn ? <Portfolio /> : <Googin setUserInParentComponent={setUser} />} />
         <Route path="/Market" element={user.isLoggedIn ? <Market /> : <Googin setUserInParentComponent={setUser} />} />
         <Route path="/Portfolio" element={user.isLoggedIn ? <Portfolio /> : <Googin setUserInParentComponent={setUser} />} />
       </Routes>
     </Router>
     
      
     </>
      

  )
}

export default App
