import React, { useState, useEffect } from 'react'
import { useAccount, useConnect, useDisconnect, useEnsName } from 'wagmi'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const ConnectWallet: React.FC = () => {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const { data: ensName } = useEnsName({ address })
  const [connectorsReady, setConnectorsReady] = useState<Record<string, boolean>>({})

  // 檢查每個連接器是否準備就緒
  useEffect(() => {
    const checkConnectorsReady = async () => {
      const readyStates: Record<string, boolean> = {}

      for (const connector of connectors) {
        try {
          // 嘗試獲取提供者來判斷連接器是否準備就緒
          const provider = await connector.getProvider()
          readyStates[connector.id] = !!provider
        } catch (error) {
          readyStates[connector.id] = false
        }
      }

      setConnectorsReady(readyStates)
    }

    checkConnectorsReady()
  }, [connectors])

  // 格式化地址顯示
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  // 顯示的名稱：ENS 名稱或格式化的地址
  const displayName = ensName || (address ? formatAddress(address) : '')

  return (
    <div>
      {isConnected ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-9 px-4 py-2 transition-all cursor-pointer">
              {displayName}
              <ChevronDown className="h-4 w-4" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>錢包地址</DropdownMenuLabel>
            <DropdownMenuItem className="break-all cursor-default">{address}</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => disconnect()}
              className="text-destructive focus:text-destructive cursor-pointer"
            >
              中斷連接
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-9 px-4 py-2 transition-all cursor-pointer">
              連接錢包
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>選擇錢包</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {connectors.map((connector) => (
              <DropdownMenuItem
                key={connector.id}
                onClick={() => connect({ connector })}
                disabled={!connectorsReady[connector.id]}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="bg-muted text-xs">{getWalletInitial(connector.id)}</AvatarFallback>
                </Avatar>
                <span>{getWalletName(connector.id)}</span>
                {!connectorsReady[connector.id] && ' (不可用)'}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}

// 獲取錢包名稱
function getWalletName(id: string): string {
  switch (id) {
    case 'metaMask':
      return 'MetaMask'
    case 'walletConnect':
      return 'WalletConnect'
    case 'coinbaseWallet':
      return 'Coinbase Wallet'
    case 'injected':
      return '瀏覽器錢包'
    default:
      return id
  }
}

// 獲取錢包首字母
function getWalletInitial(id: string): string {
  switch (id) {
    case 'metaMask':
      return 'M'
    case 'walletConnect':
      return 'W'
    case 'coinbaseWallet':
      return 'C'
    case 'injected':
      return 'B'
    default:
      return id.charAt(0).toUpperCase()
  }
}

export default ConnectWallet
