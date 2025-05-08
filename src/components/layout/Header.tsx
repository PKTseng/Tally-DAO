import React from 'react'
import { Link } from 'react-router'
import ConnectWallet from '@/components/wallet/ConnectWallet'

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">
            <Link to="/" className="hover:text-blue-400 transition">
              DAO 投票系統
            </Link>
          </h1>
          <nav className="ml-8 hidden md:block">
            <ul className="flex space-x-6">
              {/* <li>
                <Link to="/" className="hover:text-blue-400 transition">
                  首頁
                </Link>
              </li> */}
              <li>
                <Link to="/proposals" className="hover:text-blue-400 transition">
                  所有提案
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <ConnectWallet />
      </div>
    </header>
  )
}

export default Header
