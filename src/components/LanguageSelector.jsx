import React from 'react'

const LanguageSelector = ({ language, setLanguage }) => {
  const languages = [
    { code: 'pt', flag: '🇧🇷', name: 'Português' },
    { code: 'en', flag: '🇺🇸', name: 'English' },
    { code: 'es', flag: '🇪🇸', name: 'Español' },
    { code: 'ru', flag: '🇷🇺', name: 'Русский' },
    { code: 'zh', flag: '🇨🇳', name: '中文' },
    { code: 'ja', flag: '🇯🇵', name: '日本語' }
  ]

  return (
    <div className="flex items-center space-x-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
            language === lang.code
              ? 'bg-primary-500/20 border border-primary-500/30 scale-110'
              : 'bg-white/5 hover:bg-white/10 border border-white/10'
          }`}
          title={lang.name}
        >
          <span className="text-lg">{lang.flag}</span>
        </button>
      ))}
    </div>
  )
}

export default LanguageSelector
