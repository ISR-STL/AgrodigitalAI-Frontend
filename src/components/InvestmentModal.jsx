import React, { useState } from 'react'
import { X, Wallet, Calculator, AlertCircle, CheckCircle } from 'lucide-react'
import { useApi } from '../hooks/useApi'

const InvestmentModal = ({ token, isConnected, account, onClose, onComplete, onConnectWallet }) => {
  const [amount, setAmount] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  
  const { createInvestment } = useApi()

  const calculateTokens = () => {
    if (!amount || !token.price) return 0
    return (parseFloat(amount) / token.price).toFixed(2)
  }

  const handleInvest = async () => {
    if (!isConnected) {
      onConnectWallet()
      return
    }

    if (!amount || parseFloat(amount) <= 0) {
      setError('Por favor, insira um valor válido')
      return
    }

    if (parseFloat(amount) < 10) {
      setError('Valor mínimo de investimento: $10')
      return
    }

    const maxAvailable = token.goal - token.raised
    if (parseFloat(amount) > maxAvailable) {
      setError(`Valor máximo disponível: $${maxAvailable.toLocaleString()}`)
      return
    }

    setIsProcessing(true)
    setError('')

    try {
      await createInvestment(token.id, account, parseFloat(amount))
      setSuccess(true)
      setTimeout(() => {
        onComplete()
      }, 2000)
    } catch (err) {
      setError(err.message || 'Erro ao processar investimento')
    } finally {
      setIsProcessing(false)
    }
  }

  if (success) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="glass-card p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Investimento Realizado!</h3>
          <p className="text-gray-400 mb-4">
            Seu investimento de ${amount} em {token.symbol} foi processado com sucesso.
          </p>
          <p className="text-sm text-gray-500">
            Fechando automaticamente...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="glass-card p-6 max-w-md w-full relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Investir em</h2>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">{token.symbol}</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{token.name}</h3>
              <p className="text-gray-400 text-sm">Preço: ${token.price}</p>
            </div>
          </div>
        </div>

        {/* Investment Form */}
        <div className="space-y-4">
          {/* Amount Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Valor do Investimento (USD)
            </label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="100.00"
                min="10"
                step="0.01"
                className="w-full bg-dark-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none"
              />
              <div className="absolute right-3 top-3 text-gray-400">
                USD
              </div>
            </div>
          </div>

          {/* Token Calculation */}
          {amount && (
            <div className="bg-dark-800/50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 flex items-center">
                  <Calculator className="w-4 h-4 mr-2" />
                  Você receberá:
                </span>
                <span className="text-primary-400 font-bold">
                  {calculateTokens()} {token.symbol}
                </span>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 flex items-start space-x-2">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <span className="text-red-400 text-sm">{error}</span>
            </div>
          )}

          {/* Investment Button */}
          <button
            onClick={handleInvest}
            disabled={isProcessing}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
              isProcessing
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'btn-primary'
            }`}
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Processando...</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Confirmar Investimento</span>
              </>
            )}
          </button>

          {/* Wallet Connection */}
          {!isConnected && (
            <div className="text-center">
              <p className="text-yellow-400 text-sm mb-2">
                Conecte sua carteira para continuar
              </p>
              <button
                onClick={onConnectWallet}
                className="text-primary-400 hover:text-primary-300 text-sm font-medium"
              >
                Conectar MetaMask
              </button>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
          <div className="flex items-start space-x-2">
            <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-blue-400 text-sm">
              <p className="font-semibold mb-1">Informações importantes:</p>
              <ul className="space-y-1 text-xs">
                <li>• Investimento mínimo: $10 USD</li>
                <li>• Transação processada via blockchain</li>
                <li>• Tokens enviados automaticamente</li>
                <li>• Operação segura e auditada</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvestmentModal
