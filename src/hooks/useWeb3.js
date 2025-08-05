import { useState, useEffect } from 'react'

export const useWeb3 = () => {
  const [account, setAccount] = useState(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)

  useEffect(() => {
    checkConnection()
  }, [])

  const checkConnection = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' })
        if (accounts.length > 0) {
          setAccount(accounts[0])
          setIsConnected(true)
        }
      } catch (error) {
        console.error('Error checking connection:', error)
      }
    }
  }

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      alert('MetaMask não está instalado! Por favor, instale o MetaMask para continuar.')
      return false
    }

    setIsConnecting(true)
    try {
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      })
      
      if (accounts.length > 0) {
        setAccount(accounts[0])
        setIsConnected(true)
        return true
      }
    } catch (error) {
      console.error('Error connecting wallet:', error)
      if (error.code === 4001) {
        alert('Conexão rejeitada pelo usuário')
      } else {
        alert('Erro ao conectar carteira: ' + error.message)
      }
    } finally {
      setIsConnecting(false)
    }
    return false
  }

  const disconnectWallet = () => {
    setAccount(null)
    setIsConnected(false)
  }

  const formatAddress = (address) => {
    if (!address) return ''
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return {
    account,
    isConnected,
    isConnecting,
    connectWallet,
    disconnectWallet,
    formatAddress
  }
}

