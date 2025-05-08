import React from 'react'
import { Link } from 'react-router'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-400">© {new Date().getFullYear()} DAO 投票系統 - 區塊鏈應用範例</p>
          </div>
          <div className="flex space-x-4">
            <Link
              to="https://github.com/PKTseng/Tally-DAO"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
            >
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
