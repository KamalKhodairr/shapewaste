'use client'

import { useEffect, useRef } from 'react'
import { AXIS_DATA } from '@/lib/data/streams'

export default function ValueAxis() {
  const sectionRef = useRef<HTMLElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !('IntersectionObserver' in window)) {
      section.querySelectorAll('.reveal').forEach(el => el.classList.add('in'))
      return
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -8% 0px' })
    section.querySelectorAll('.reveal').forEach(el => io.observe(el))
    const safety = setTimeout(() => section.querySelectorAll('.reveal').forEach(el => el.classList.add('in')), 3000)
    return () => { io.disconnect(); clearTimeout(safety) }
  }, [])

  return (
    <section ref={sectionRef} style={{ borderBottom: '1px solid var(--line-heavy)', background: 'var(--mineral)' }}>
      <div className="reveal d2" style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: 'clamp(28px,3.4vw,42px) var(--px)' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16, marginBottom: 16 }}>
          <span className="mono" style={{ fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--copper)' }}>
            What a tonne is worth, recovered · SAR
          </span>
          <span className="mono" style={{ fontSize: 11, letterSpacing: '.1em', color: 'var(--muted-nav)' }}>
            cool, buried&nbsp;&rarr;&nbsp;<span style={{ color: 'var(--copper)' }}>warm, worth</span>
          </span>
        </div>

        {/* gradient axis bar */}
        <div ref={barRef} className="grow" style={{
          height: 14,
          background: 'linear-gradient(90deg,#2F4A3F 0%,#3E5C46 20%,#6B7F5F 40%,#8A8A52 60%,#8C6F3E 80%,#A9782E 100%)',
        }} />

        {/* 6-col grid */}
        <div className="axgrid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6,1fr)',
          gap: 'clamp(8px,1.5vw,20px)',
          marginTop: 16,
        }}>
          <style>{`
            @media(max-width:820px){.axgrid{grid-template-columns:repeat(3,1fr)!important;row-gap:20px!important;}}
            @media(max-width:460px){.axgrid{grid-template-columns:repeat(2,1fr)!important;}}
          `}</style>
          {AXIS_DATA.map((a, i) => (
            <div key={i} style={{ borderTop: '1px solid var(--line)', paddingTop: 12 }}>
              <div style={{ fontSize: 12.5, color: 'var(--muted-nav)', lineHeight: 1.25 }}>{a.label}</div>
              <div className="mono" style={{ fontSize: 'clamp(17px,1.7vw,21px)', color: 'var(--ink)', marginTop: 6, letterSpacing: '-.01em' }}>
                {a.rate.toLocaleString('en-US')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
