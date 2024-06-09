import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import Home from "./pages/Home"
import CreateCard from "./pages/CreateCard"
import CreateSetCard from './pages/CreateSetCard';
import Login from './pages/Login';
import Registration from './pages/Registration';
import AuthContext from './AuthContext';
import { useState,useEffect } from 'react';
import axios from 'axios';
import PageNotFound from './pages/PageNotFound';
import {Navigate} from 'react-router-dom';

function App() {
  const [auth,Setauth]=useState(false);
  
  useEffect(()=>{
    axios.get("http://localhost:3001/auth",{headers:{
      accessToken:localStorage.getItem("accessToken")
    }}).then((res)=>{
      if(res.data.error) {Setauth(false);}
      else{
        Setauth(true);
      }
    })
    },[])
    
  const Logout=()=>{
    localStorage.removeItem("accessToken");
    Setauth(false);
  }
  
  return (
    <div className="App">
      <AuthContext.Provider value={{auth,Setauth}}>
      <Router>
        <div className='container'>
          <div className='nav'>
            <h1>Flashcards</h1>
            <div className='buttonss'>
              <button>
                <Link style={{ textDecoration: 'none' }}to='/'>Home</Link>
              </button>
              {!auth?(
              <button>
                <Link style={{ textDecoration: 'none' }}to='/login'>Login</Link>
              </button>):(<button onClick={Logout}>Logout</button>)
              }
            </div>
          </div>
        </div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/createcard' element={<CreateCard />} />
          <Route path='/createsetcard' element={<CreateSetCard />} />
          <Route path='/setofcards/:id' element={auth?<CreateCard/>:<Navigate to="/"/>}/>
          <Route path='/login' element={auth?<Navigate to="/"/>:<Login/>}/>
          <Route path='/registration' element={auth?<Navigate to="/"/>:<Registration/>}/>
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
      </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
