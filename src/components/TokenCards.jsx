import React from 'react'
import { Target, TrendingUp, Zap } from 'lucide-react'

const TokenCard = ({ token, onInvest }) => {
  const progressPercentage = token.progress || 0
  const isCompleted = progressPercentage >= 100

  const getTokenColor = (symbol) => {
    const colors = {
      'AGRO1': 'from-green-500 to-green-600',
      'AGRO2': 'from-blue-500 to-blue-600', 
      'AGRO3': 'from-purple-500 to-purple-600',
      'AGRO4': 'from-orange-500 to-orange-600',
      'AGRO5': 'from-yellow-500 to-yellow-600'
    }
    return colors[symbol] || 'from-primary-500 to-primary-600'
  }

  const getProgressColor = (symbol) => {
    const colors = {
      'AGRO1': 'from-green-500 to-green-400',
      'AGRO2': 'from-blue-500 to-blue-400',
      'AGRO3': 'from-purple-500 to-purple-400', 
      'AGRO4': 'from-orange-500 to-orange-400',
      'AGRO5': 'from-yellow-500 to-yellow-400'
    }
    return colors[symbol] || 'from-primary-500 to-primary-400'
  }

  return (
    <div className="glass-card p-6 hover:bg-white/10 transition-all duration-300 group">
      {/* Token Icon */}
      <div className="flex items-center justify-between mb-4">
        <div className={`w-16 h-16 bg-gradient-to-r ${getTokenColor(token.symbol)} rounded-xl flex items-center justify-center`}>
          <Target className="w-8 h-8 text-white" />
        </div>
        {isCompleted && (
          <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
            Completo
          </div>
        )}
      </div>

      {/* Token Info */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-white mb-1">{token.name}</h3>
        <p className="text-gray-400 text-sm">{token.symbol}</p>
      </div>

      {/* Price */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Preço:</span>
          <span className="text-2xl font-bold text-primary-400">
            ${token.price}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">
            ${token.raised?.toLocaleString() || '0'}
          </span>
          <span className="text-sm text-gray-400">
            ${token.goal?.toLocaleString() || '0'}
          </span>
        </div>
        <div className="progress-bar">
          <div 
            className={`progress-fill bg-gradient-to-r ${getProgressColor(token.symbol)}`}
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          ></div>
        </div>
        <div className="text-center mt-2">
          <span className="text-sm text-gray-400">
            {progressPercentage.toFixed(1)}% concluído
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-400 text-sm mb-6 line-clamp-2">
        {token.description}
      </p>

      {/* Buy Button */}
      <button
        onClick={() => onInvest(token)}
        disabled={isCompleted}
        className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
          isCompleted
            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
            : `bg-gradient-to-r ${getTokenColor(token.symbol)} hover:scale-105 text-white shadow-lg hover:shadow-xl`
        }`}
      >
        <Zap className="w-4 h-4" />
        <span>
          {isCompleted ? 'Meta Atingida' : `Comprar ${token.symbol}`}
        </span>
      </button>
    </div>
  )
}

export default TokenCard
