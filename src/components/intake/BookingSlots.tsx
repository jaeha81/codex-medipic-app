'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import type { Translations } from '@/i18n/en'

interface BookingSlotsProps {
  t: Translations
}

export function BookingSlots({ t }: BookingSlotsProps) {
  const [selected, setSelected] = useState<number | null>(null)
  const [confirmed, setConfirmed] = useState(false)

  if (confirmed && selected !== null) {
    const slot = t.booking.slots[selected]
    return (
      <div className="text-center space-y-4 py-4">
        <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto">
          <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <div>
          <p className="text-lg font-bold text-gray-900">{slot.label}</p>
          <p className="text-primary font-semibold">{slot.time}</p>
        </div>
        <p className="text-sm text-gray-500">{t.booking.note}</p>
        <Button variant="line" size="lg" fullWidth>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.03 2 11.02c0 2.97 1.54 5.61 3.94 7.31L4.9 22l3.76-1.95C9.68 20.64 10.82 21 12 21c5.52 0 10-4.03 10-8.98S17.52 2 12 2z"/>
          </svg>
          {t.booking.confirm}
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">{t.booking.slotLabel}</p>
      <div className="space-y-3">
        {t.booking.slots.map((slot, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={[
              'w-full flex items-center gap-4 border-2 rounded-2xl p-4 transition-all text-left',
              selected === i
                ? 'border-primary bg-bg-warm shadow-sm'
                : 'border-gray-200 hover:border-primary hover:bg-bg-warm',
            ].join(' ')}
          >
            <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${selected === i ? 'border-primary' : 'border-gray-300'}`}>
              {selected === i && <span className="w-2.5 h-2.5 bg-primary rounded-full" />}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">{slot.label}</p>
              <p className="text-sm text-gray-500">{slot.time}</p>
            </div>
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" />
            </svg>
          </button>
        ))}
      </div>
      <Button variant="line" size="lg" fullWidth disabled={selected === null} onClick={() => setConfirmed(true)}>
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.03 2 11.02c0 2.97 1.54 5.61 3.94 7.31L4.9 22l3.76-1.95C9.68 20.64 10.82 21 12 21c5.52 0 10-4.03 10-8.98S17.52 2 12 2z"/>
        </svg>
        {t.booking.confirm}
      </Button>
      <p className="text-xs text-center text-gray-400">{t.booking.note}</p>
    </div>
  )
}
