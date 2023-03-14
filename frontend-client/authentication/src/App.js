import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LogIn from './components/LogIn';
import Register from './components/Register';
import Home from './components/Home';
import Landing from './components/Landing';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <ToastContainer></ToastContainer>
      <BrowserRouter>
      <Routes>
        
        <Route path='/' element={<Landing/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/login' element={<LogIn/>}></Route>
        <Route path='register' element={<Register/>}></Route>
      </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
