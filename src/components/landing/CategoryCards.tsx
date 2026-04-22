'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { CATEGORIES } from '@/data/categories'
import type { Translations } from '@/i18n/en'
import type { Locale } from '@/i18n'

interface CategoryCardsProps {
  t: Translations
  locale: Locale
}

const CATEGORY_IMAGES: Record<string, string> = {
  weight:    'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&q=80',
  hair:      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
  menopause: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=600&q=80',
  skincare:  'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80',
}

export function CategoryCards({ t, locale }: CategoryCardsProps) {
  const headingRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return

    // Reveal heading
    const headingEl = headingRef.current
    if (headingEl) {
      headingEl.style.opacity = '0'
      headingEl.style.transform = 'translateY(20px)'
      headingEl.style.transition = 'opacity 0.65s ease, transform 0.65s ease'

      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          headingEl.style.opacity = '1'
          headingEl.style.transform = 'translateY(0)'
          obs.disconnect()
        }
      }, { threshold: 0.16, rootMargin: '0px 0px -40px 0px' })
      obs.observe(headingEl)
    }

    // Stagger feature-cards (Codex: index % 3 * 0.05 for col offset, max 320ms)
    const gridEl = gridRef.current
    if (gridEl) {
      const cards = Array.from(gridEl.children) as HTMLElement[]
      cards.forEach((card, i) => {
        card.style.opacity = '0'
        card.style.transform = 'translateY(24px)'
        card.style.transition = 'opacity 0.62s ease, transform 0.62s ease'
        card.style.transitionDelay = `${Math.min(i * 75, 320)}ms`
      })

      const obs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            ;(entry.target as HTMLElement).style.opacity = '1'
            ;(entry.target as HTMLElement).style.transform = 'translateY(0)'
            obs.unobserve(entry.target)
          }
        })
      }, { threshold: 0.16, rootMargin: '0px 0px -40px 0px' })

      cards.forEach((card) => obs.observe(card))
    }
  }, [])

  return (
    <section className="py-20 px-6 bg-[#F3F6F1]">
      <div className="max-w-5xl mx-auto">
        <div ref={headingRef} className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">{t.categories.title}</h2>
          <p className="text-gray-500">{t.categories.subtitle}</p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CATEGORIES.map((cat) => {
            const label = locale === 'ja' ? cat.labelJa : cat.labelEn
            const subtitle = locale === 'ja' ? cat.subtitleJa : cat.subtitleEn
            const keywords = locale === 'ja' ? cat.keywordsJa : cat.keywordsEn

            return (
              <Link
                key={cat.id}
                href={`/intake/${cat.id}`}
                className="feature-card group relative rounded-2xl overflow-hidden block"
              >
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img
                    src={CATEGORY_IMAGES[cat.id]}
                    alt={label}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  <div className="absolute inset-0 flex flex-col justify-end p-5">
                    <p className="text-xs text-white/60 font-medium mb-1">{subtitle}</p>
                    <h3 className="text-xl font-bold text-white mb-3">{label}</h3>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {keywords.slice(0, 2).map((kw) => (
                        <span key={kw} className="text-xs px-2 py-0.5 rounded-full bg-white/15 text-white/90">
                          {kw}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5 text-white/80 text-sm font-medium group-hover:text-white transition-colors">
                      {t.categories.select}
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
