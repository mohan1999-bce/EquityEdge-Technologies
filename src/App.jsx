import { useState } from 'react'
import Login from './Componets/Login/login';
import Googin from './Componets/Login/sample';
import TradeProLogin from './Componets/Login/Equity';
import Navbar from './Componets/Login/Navbar';

//import './App.css'npm install vite --save-dev
//
function App(){
  const [user, setUser] = useState({
   user:'',
   isLoggedIn:false

  });



  return (
      <>
      {user.isLoggedIn && <Navbar/>}
      {!user.isLoggedIn && < Googin setUserInParentComponent ={setUser}/>}
     </>
      

  )
}

export default App
