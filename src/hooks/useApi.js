import { useState, useEffect } from 'react'

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://agrodigitalai-production.up.railway.app' 
  : 'http://localhost:5000'

export const useApi = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchTokens = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_BASE_URL}/api/tokens`)
      if (!response.ok) throw new Error('Failed to fetch tokens')
      const data = await response.json()
      return data.data || []
    } catch (err) {
      setError(err.message)
      return []
    } finally {
      setLoading(false)
    }
  }

  const fetchTokenStats = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_BASE_URL}/api/tokens/stats`)
      if (!response.ok) throw new Error('Failed to fetch stats')
      const data = await response.json()
      return data.data || {}
    } catch (err) {
      setError(err.message)
      return {}
    } finally {
      setLoading(false)
    }
  }

  const createInvestment = async (tokenId, walletAddress, amountUsd) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_BASE_URL}/api/presale/invest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token_id: tokenId,
          wallet_address: walletAddress,
          amount_usd: amountUsd,
          payment_method: 'metamask'
        })
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create investment')
      }
      
      const data = await response.json()
      return data.data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    fetchTokens,
    fetchTokenStats,
    createInvestment
  }
}

