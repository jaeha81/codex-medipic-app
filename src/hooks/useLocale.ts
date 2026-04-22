'use client'

import { useState, useEffect } from 'react'
import type { Locale } from '@/i18n'

const STORAGE_KEY = 'medipic_locale'

export function useLocale(): [Locale, (l: Locale) => void] {
  const [locale, setLocaleState] = useState<Locale>('en')

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null
    const initial = (saved === 'en' || saved === 'ja') ? saved : 'en'
    setLocaleState(initial)
    document.documentElement.lang = initial
  }, [])

  function setLocale(l: Locale) {
    setLocaleState(l)
    localStorage.setItem(STORAGE_KEY, l)
    document.documentElement.lang = l
  }

  return [locale, setLocale]
}
