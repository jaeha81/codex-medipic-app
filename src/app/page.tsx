'use client'

import Link from 'next/link'
import { useLocale } from '@/hooks/useLocale'
import { en } from '@/i18n/en'
import { ja } from '@/i18n/ja'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import { Hero } from '@/components/landing/Hero'
import { CategoryCards } from '@/components/landing/CategoryCards'
import { HowItWorks } from '@/components/landing/HowItWorks'

export default function HomePage() {
  const [locale, setLocale] = useLocale()
  const t = locale === 'ja' ? ja : en

  return (
    <div className="flex flex-col min-h-screen">
      {/* Nav */}
      <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-5 max-w-5xl mx-auto w-full">
        <Link href="/" className="text-white font-bold text-xl tracking-tight">
          medipic
        </Link>
        <div className="flex items-center gap-4">
          <LanguageSwitcher locale={locale} onChange={setLocale} />
          <Link
            href="/intake"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-[#1E60C8] text-white font-semibold rounded-xl text-sm hover:bg-[#1650A8] transition-colors"
          >
            {t.nav.start}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </nav>

      <main className="flex-1">
        <Hero t={t} locale={locale} />
        <CategoryCards t={t} locale={locale} />
        <HowItWorks t={t} />
      </main>

      {/* Footer */}
      <footer className="bg-[#0A1C12] text-white/40 py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-bold text-white/70 text-lg">medipic</p>
          <p className="text-sm">© 2025 medipic. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-white/70 transition-colors">Privacy</a>
            <a href="#" className="hover:text-white/70 transition-colors">Terms</a>
            <a href="#" className="hover:text-white/70 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
