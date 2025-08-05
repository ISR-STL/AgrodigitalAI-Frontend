import React from 'react'
import { Home, TrendingUp, Leaf, ShoppingCart, Crown, Info, Phone } from 'lucide-react'

const Navigation = () => {
  const navItems = [
    { icon: Home, label: 'Home', active: true },
    { icon: TrendingUp, label: 'Invest' },
    { icon: Leaf, label: 'ESG' },
    { icon: ShoppingCart, label: 'Marketplace' },
    { icon: Crown, label: 'VIP Club' },
    { icon: Info, label: 'About' },
    { icon: Phone, label: 'Contact' }
  ]

  return (
    <nav className="bg-dark-800/50 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center space-x-1 py-3">
          {navItems.map((item, index) => {
            const Icon = item.icon
            return (
              <button
                key={index}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  item.active
                    ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export default Navigation

