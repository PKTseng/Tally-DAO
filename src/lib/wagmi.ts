import { createConfig, http } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { injected, metaMask, walletConnect, coinbaseWallet } from 'wagmi/connectors'

// 如果您有 WalletConnect 專案 ID，請從環境變數導入
const walletConnectProjectId = import.meta.env.VITE_WC_PROJECT_ID || ''

// 創建 Wagmi 配置
export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    // 瀏覽器內置錢包連接器
    injected(),

    // MetaMask 連接器
    metaMask(),

    // WalletConnect 連接器
    walletConnect({ projectId: walletConnectProjectId }),

    // Coinbase Wallet 連接器
    coinbaseWallet({ appName: 'DAO 投票系統' }),
  ],
  transports: {
    // 為每個鏈配置傳輸方式
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})

// 定義 DAO 合約地址
export const contracts = {
  daoVoting: {
    [mainnet.id]: '0x...', // 主網合約地址，需要替換為實際地址
    [sepolia.id]: '0x...', // 測試網合約地址，需要替換為實際地址
  },
} as const
