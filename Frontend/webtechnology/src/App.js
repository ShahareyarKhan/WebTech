import React from 'react'
import './App.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import Both from './Components/Both';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />}/>
          <Route path='/loginsignup' element={<Both/>}/>
        </Routes>

      </Router>
     
    </div>
  )
}

export default App
