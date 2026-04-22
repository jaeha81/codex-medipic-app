'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { useCountUp } from '@/hooks/useCountUp'
import type { Translations } from '@/i18n/en'
import type { Locale } from '@/i18n'

interface HeroProps {
  t: Translations
  locale: Locale
}

const HERO_CARDS = [
  {
    id: 'weight',
    img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=400&q=80',
    labelEn: 'Weight',
    labelJa: '体重管理',
  },
  {
    id: 'hair',
    img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80',
    labelEn: 'Hair',
    labelJa: '抜け毛',
  },
  {
    id: 'menopause',
    img: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=400&q=80',
    labelEn: 'Menopause',
    labelJa: '更年期',
  },
  {
    id: 'skincare',
    img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=400&q=80',
    labelEn: 'Skin',
    labelJa: '肌ケア',
  },
]

export function Hero({ t, locale }: HeroProps) {
  // hero-copy > * stagger: each child animates in sequentially
  const copyRef = useRef<HTMLDivElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const copyEl = copyRef.current
    const mediaEl = mediaRef.current
    if (!copyEl || !mediaEl) return

    // Stagger hero-copy children (badge, h1, p, buttons, stats)
    const children = Array.from(copyEl.children) as HTMLElement[]
    children.forEach((child, i) => {
      child.style.opacity = '0'
      child.style.transform = 'translateY(22px)'
      child.style.transition = `opacity 0.68s ease, transform 0.68s ease`
      child.style.transitionDelay = `${Math.min(i * 80, 320)}ms`
      requestAnimationFrame(() => {
        setTimeout(() => {
          child.style.opacity = '1'
          child.style.transform = 'translateY(0)'
        }, 60)
      })
    })

    // hero-media delayed entrance
    mediaEl.style.opacity = '0'
    mediaEl.style.transform = 'translateY(24px)'
    mediaEl.style.transition = 'opacity 0.82s ease, transform 0.82s ease'
    mediaEl.style.transitionDelay = '160ms'
    requestAnimationFrame(() => {
      setTimeout(() => {
        mediaEl.style.opacity = '1'
        mediaEl.style.transform = 'translateY(0)'
      }, 60)
    })
  }, [])

  // Animated counters (Codex-style: count up on scroll)
  const stat1 = useCountUp({ target: 500, suffix: 'K+', duration: 900 })
  const stat3 = useCountUp({ target: 49, suffix: '', duration: 900 })

  return (
    <section className="relative bg-[#0C1A29] overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#1E60C8]/12 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#3B8FD4]/8 blur-[100px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 pt-24 pb-0 lg:pt-32">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Left: hero-copy — stagger children */}
          <div ref={copyRef} className="flex-1 text-center lg:text-left flex flex-col gap-0">
            {/* child 0: badge */}
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#1E60C8]/15 text-[#7AABEC] text-sm font-semibold mb-6 border border-[#1E60C8]/25 self-center lg:self-start">
              {t.hero.badge}
            </span>

            {/* child 1: h1 */}
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
              {t.hero.title.split('\n').map((line, i) => (
                <span key={i} className="block">
                  {i === 1 ? <span className="text-[#4D94F0]">{line}</span> : line}
                </span>
              ))}
            </h1>

            {/* child 2: subtitle */}
            <p className="text-lg text-white/60 mb-10 max-w-md mx-auto lg:mx-0 leading-relaxed">
              {t.hero.subtitle}
            </p>

            {/* child 3: CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-12">
              <Link
                href="/intake"
                className="flex items-center justify-center gap-2.5 px-8 py-4 bg-[#07B53B] hover:bg-[#06A034] text-white font-semibold rounded-2xl transition-all duration-200 shadow-lg shadow-[#07B53B]/25 hover:shadow-[#07B53B]/40 hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.03 2 11.02c0 2.97 1.54 5.61 3.94 7.31L4.9 22l3.76-1.95C9.68 20.64 10.82 21 12 21c5.52 0 10-4.03 10-8.98S17.52 2 12 2z"/>
                </svg>
                {t.hero.cta_line}
              </Link>
              <Link
                href="/intake"
                className="flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white font-semibold rounded-2xl hover:bg-white/10 transition-all duration-200"
              >
                {t.hero.cta_web}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* child 4: stats (counter animation) */}
            <div className="flex items-center justify-center lg:justify-start gap-8 pb-12 lg:pb-0">
              <div className="text-center lg:text-left">
                <p className="text-2xl font-bold text-white">
                  <span ref={stat1.ref}>{stat1.display}</span>
                </p>
                <p className="text-xs text-white/40 mt-0.5">Patients</p>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="text-center lg:text-left">
                <p className="text-2xl font-bold text-white">¥0</p>
                <p className="text-xs text-white/40 mt-0.5">Consult fee</p>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="text-center lg:text-left">
                <p className="text-2xl font-bold text-white">
                  <span ref={stat3.ref} data-raw={stat3.display}>
                    {/* format 49 → 4.9 */}
                    {stat3.display === '49' ? '4.9' : (parseInt(stat3.display) / 10).toFixed(1)}
                  </span>
                </p>
                <p className="text-xs text-white/40 mt-0.5">★ Rating</p>
              </div>
            </div>
          </div>

          {/* Right: hero-media */}
          <div ref={mediaRef} className="flex-1 w-full max-w-sm lg:max-w-none">
            <div className="grid grid-cols-2 gap-3">
              {HERO_CARDS.map((card, i) => (
                <Link
                  key={card.id}
                  href={`/intake/${card.id}`}
                  className="group relative rounded-2xl overflow-hidden aspect-square block"
                >
                  <img
                    src={card.img}
                    alt={locale === 'ja' ? card.labelJa : card.labelEn}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 text-white text-sm font-semibold">
                    {locale === 'ja' ? card.labelJa : card.labelEn}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="h-16 bg-gradient-to-b from-transparent to-[#F3F6F1]" />
    </section>
  )
}
