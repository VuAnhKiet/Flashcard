import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import Home from "./pages/Home"
import CreateCard from "./pages/CreateCard"
import CreateSetCard from './pages/CreateSetCard';
import Login from './pages/Login';
import Registration from './pages/Registration';
function App() {
  return (
    <div className="App">
      <Router>
        <div className='container'>
          <div className='nav'>
            <h1>Flashcards</h1>
            <div className='buttonss'>
              <button>
                <Link style={{ textDecoration: 'none' }}to='/'>Home</Link>
              </button>
              <button>
                <Link style={{ textDecoration: 'none' }}to='/login'>Login</Link>
              </button>
            </div>
          </div>
        </div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/createcard' element={<CreateCard />} />
          <Route path='/createsetcard' element={<CreateSetCard />} />
          <Route path='/setofcards/:id' element={<CreateCard/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/registration' element={<Registration/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
