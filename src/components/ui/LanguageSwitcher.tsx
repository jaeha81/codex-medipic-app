'use client'

import type { Locale } from '@/i18n'

interface LanguageSwitcherProps {
  locale: Locale
  onChange: (l: Locale) => void
}

export function LanguageSwitcher({ locale, onChange }: LanguageSwitcherProps) {
  return (
    <div className="flex items-center gap-1 bg-white/10 rounded-full p-1">
      {(['en', 'ja'] as Locale[]).map(l => (
        <button
          key={l}
          onClick={() => onChange(l)}
          className={[
            'px-3 py-1 rounded-full text-sm font-semibold transition-all',
            locale === l ? 'bg-white text-gray-900' : 'text-white/70 hover:text-white',
          ].join(' ')}
        >
          {l === 'en' ? 'EN' : 'JP'}
        </button>
      ))}
    </div>
  )
}
