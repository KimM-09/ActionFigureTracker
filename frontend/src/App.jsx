import React from 'react'
import { Route, Routes } from 'react-router'

const App = () => {
  return (
    <div>

      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
      
    </div>
  )
}

export default App
