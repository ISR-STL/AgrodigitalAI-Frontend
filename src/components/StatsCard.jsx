import React from 'react'

const StatsCard = ({ label, value, color = 'text-primary-400' }) => {
  return (
    <div className="flex items-center justify-between p-3 bg-dark-800/30 rounded-lg">
      <span className="text-gray-400 text-sm">{label}</span>
      <span className={`font-semibold ${color}`}>{value}</span>
    </div>
  )
}

export default StatsCard

