// src/App.tsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'

// 示例頁面元件
const HomePage = () => (
  <div className="text-center">
    <h1 className="text-3xl font-bold mb-4">歡迎使用 DAO 投票系統</h1>
    <p className="text-xl text-gray-600 mb-8">一個去中心化的提案與投票平台，讓社群共同決策</p>
    <p className="text-gray-600">這裡是首頁內容區域</p>
  </div>
)

const ProposalsPage = () => (
  <div>
    <h1 className="text-3xl font-bold mb-4">所有提案</h1>
    <p className="text-gray-600 mb-6">瀏覽和參與 DAO 的治理提案，為生態系統的未來發展做出貢獻。</p>
    {/* 這裡將放置提案列表 */}
  </div>
)

const AboutPage = () => (
  <div>
    <h1 className="text-3xl font-bold mb-4">關於本專案</h1>
    <p className="text-gray-600">
      DAO 投票系統是一個基於區塊鏈的去中心化應用程式，旨在提供一個透明、公開的提案和投票平台。
    </p>
  </div>
)

const App: React.FC = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/proposals" element={<ProposalsPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </MainLayout>
    </Router>
  )
}

export default App
