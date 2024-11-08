import './App.css'; // Importing the CSS file for styling
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer } from 'react-toastify';

// Pages
import Home from "./pages/Home";
import Login from './pages/Login';
import Registration from './pages/Registration';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import PageNotFound from './pages/PageNotFound';
import Friends from './pages/Friends';

// Components
import NavBar from './pages/NavBar';
import CreateCard from './component/card/CreateCard';
import CreateSetCard from './component/setcard/CreateSetCard';

// Context
import AuthContext from './AuthContext';

function App() {
  const [auth, Setauth] = useState(false);
  const api = process.env.REACT_APP_API_URL || 'http://localhost:3001';
  useEffect(() => {
    axios.get(`${api}/auth`, {
      headers: {
        accessToken: localStorage.getItem("accessToken")
      }
    }).then((res) => {
      if (res.data.error) { Setauth(false); }
      else {
        Setauth(true);
      }
    })
  }, [])

  const Logout = () => {
    localStorage.removeItem("accessToken");
    Setauth(false);
    window.location.href = '/';
  }

  return (
    <div className="App">
      <AuthContext.Provider value={{ auth, Setauth }}>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover={false}
          draggable
        />
        <Router>
          <NavBar Logout={Logout} auth={auth} />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/createcard' element={<CreateCard />} />
            <Route path='/createsetcard' element={<CreateSetCard />} />
            <Route path='/setofcards/:id' element={auth && <CreateCard />} />
            <Route path='/login' element={auth ? <Navigate to="/" /> : <Login />} />
            <Route path='/registration' element={auth ? <Navigate to="/" /> : <Registration />} />
            <Route path='/forgotpassword' element={<ForgotPassword />} />
            <Route path='/reset-password/:token' element={<ResetPassword />} />
            <Route path='/friends' element={auth ? <Friends /> : <Navigate to="/" />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
