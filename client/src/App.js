import React from 'react'
import { Home, Play } from './scenes/scenes'
import {BrowserRouter, Route, Routes} from "react-router-dom"

const App = () => {
  return (
    <div>
      
      <BrowserRouter>
        <Routes >
          <Route path='/' element={<Home />} />
          <Route path="/play" element={<Play />} />
        </Routes>
      </BrowserRouter>
      
      
    </div>
  )
}

export default App