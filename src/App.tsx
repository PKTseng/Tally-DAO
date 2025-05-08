import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import HomePage from './pages/Home'
import Proposals from './pages/Proposals'
import About from './pages/About'

const App: React.FC = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/proposals" element={<Proposals />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </MainLayout>
  )
}

export default App
