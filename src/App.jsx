import React, { useState, useEffect } from 'react'
import { Wallet, Globe, TrendingUp, Leaf, Shield, Users, BarChart3, Target, Award, Zap } from 'lucide-react'
import { useApi } from './hooks/useApi'
import { useWeb3 } from './hooks/useWeb3'
import TokenCard from './components/TokenCard'
import InvestmentModal from './components/InvestmentModal'
import LanguageSelector from './components/LanguageSelector'
import Navigation from './components/Navigation'
import StatsCard from './components/StatsCard'

function App() {
  const [tokens, setTokens] = useState([])
  const [stats, setStats] = useState({})
  const [selectedToken, setSelectedToken] = useState(null)
  const [showInvestModal, setShowInvestModal] = useState(false)
  const [language, setLanguage] = useState('pt')
  
  const { loading, fetchTokens, fetchTokenStats } = useApi()
  const { account, isConnected, connectWallet, formatAddress } = useWeb3()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const [tokensData, statsData] = await Promise.all([
      fetchTokens(),
      fetchTokenStats()
    ])
    setTokens(tokensData)
    setStats(statsData)
  }

  const handleInvest = (token) => {
    setSelectedToken(token)
    setShowInvestModal(true)
  }

  const handleInvestmentComplete = () => {
    setShowInvestModal(false)
    setSelectedToken(null)
    loadData() // Reload data after investment
  }

  const totalRaised = stats.total_raised || 872500
  const totalGoal = stats.total_goal || 2000000
  const progressPercentage = ((totalRaised / totalGoal) * 100).toFixed(1)

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      {/* Header */}
      <header className="relative z-50 bg-dark-900/80 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                <Leaf className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">AgroDigital5.0™</h1>
                <p className="text-sm text-primary-400">ESG Investment</p>
              </div>
            </div>

            {/* Language Selector & Wallet */}
            <div className="flex items-center space-x-4">
              <LanguageSelector language={language} setLanguage={setLanguage} />
              
              <button
                onClick={connectWallet}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isConnected 
                    ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30' 
                    : 'btn-primary'
                }`}
              >
                <Wallet className="w-4 h-4" />
                <span>
                  {isConnected ? formatAddress(account) : 'Conectar Carteira'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-transparent"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">Global ESG Investment Board</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Invest with trust. Earn with impact.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button className="btn-primary flex items-center space-x-2">
              <Zap className="w-5 h-5" />
              <span>Buy Tokens</span>
            </button>
            <button className="btn-secondary flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Verify Smart Contracts</span>
            </button>
          </div>

          {/* Progress Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-400">Total Arrecadado</span>
              <span className="text-gray-400">Meta: $2,000,000</span>
            </div>
            <div className="progress-bar mb-4">
              <div 
                className="progress-fill bg-gradient-to-r from-primary-500 to-primary-400"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="text-center">
              <span className="text-4xl font-bold text-primary-400">
                ${totalRaised.toLocaleString()}
              </span>
              <span className="text-gray-400 ml-2">({progressPercentage}%)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tokens Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
              <p className="text-gray-400 mt-4">Carregando tokens...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tokens.map((token) => (
                <TokenCard
                  key={token.id}
                  token={token}
                  onInvest={handleInvest}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Dashboard Section */}
      <section className="py-16 bg-white/5">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Market Trend */}
            <div className="glass-card p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white flex items-center">
                  <TrendingUp className="w-6 h-6 text-primary-400 mr-3" />
                  Market Trend
                </h3>
              </div>
              
              {/* Chart Placeholder */}
              <div className="h-64 bg-dark-800/50 rounded-lg flex items-center justify-center mb-4">
                <div className="flex space-x-2">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-primary-500 rounded-t"
                      style={{
                        height: `${60 + Math.random() * 80}px`,
                        width: '20px'
                      }}
                    ></div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Volume 24h: $872.5K</span>
                <span className="text-primary-400 font-semibold">+43.6%</span>
              </div>
            </div>

            {/* Sustainability Board */}
            <div className="glass-card p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white flex items-center">
                  <Leaf className="w-6 h-6 text-primary-400 mr-3" />
                  Sustainability Board
                </h3>
              </div>
              
              <div className="space-y-4">
                <StatsCard
                  label="Carbon Offset"
                  value="872 tons CO2"
                  color="text-primary-400"
                />
                <StatsCard
                  label="ESG Score"
                  value="AAA+"
                  color="text-primary-400"
                />
                <StatsCard
                  label="Impact Projects"
                  value="50 Active"
                  color="text-primary-400"
                />
                <StatsCard
                  label="Global Reach"
                  value="23 Countries"
                  color="text-primary-400"
                />
              </div>
              
              <div className="mt-6 p-4 bg-primary-500/10 rounded-lg border border-primary-500/20">
                <div className="flex items-center">
                  <Award className="w-5 h-5 text-primary-400 mr-2" />
                  <span className="text-primary-400 font-semibold">Certificado ESG Global</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-900 border-t border-white/10 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">AgroDigital5.0</span>
              </div>
              <p className="text-gray-400 text-sm">
                Plataforma líder em investimentos ESG para agricultura sustentável.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Compliance</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Proteção LGPD</li>
                <li>Auditoria Externa</li>
                <li>Certificação ESG</li>
                <li>Transparência Total</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Tecnologia</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Blockchain Ethereum</li>
                <li>Smart Contracts</li>
                <li>Segurança Avançada</li>
                <li>API RESTful</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>24/7 Disponível</li>
                <li>Documentação</li>
                <li>FAQ Completo</li>
                <li>Comunidade</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 AgroDigital5.0. Todos os direitos reservados. | Desenvolvido com ❤️ para um futuro sustentável.
            </p>
          </div>
        </div>
      </footer>

      {/* Investment Modal */}
      {showInvestModal && selectedToken && (
        <InvestmentModal
          token={selectedToken}
          isConnected={isConnected}
          account={account}
          onClose={() => setShowInvestModal(false)}
          onComplete={handleInvestmentComplete}
          onConnectWallet={connectWallet}
        />
      )}
    </div>
  )
}

export default App
