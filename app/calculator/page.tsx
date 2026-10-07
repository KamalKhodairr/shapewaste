'use client'

import { useReducer, useEffect, useRef, useCallback } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import Link from 'next/link'
import { DEFAULT_STREAMS, Stream } from '@/lib/data/streams'

// ── Animated number hook ─────────────────────────────────────────
function useAnimatedNumber(target: number, duration = 550) {
  const rafRef = useRef<number | undefined>(undefined)
  const fromRef = useRef(0)
  const [display, setDisplay] = useReducer((_: number, n: number) => n, target)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) { setDisplay(target); return }
    const from = fromRef.current
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      const e = 1 - Math.pow(1 - p, 3)
      setDisplay(Math.round(from + (target - from) * e))
      if (p < 1) rafRef.current = requestAnimationFrame(tick)
      else fromRef.current = target
    }
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [target, duration])

  return display
}

// ── State ────────────────────────────────────────────────────────
type Tonnes = Record<string, number>

function initialTonnes(): Tonnes {
  return Object.fromEntries(DEFAULT_STREAMS.map(s => [s.id, s.tonnes]))
}

function totals(streams: Stream[], tonnes: Tonnes) {
  let month = 0, disposal = 0
  streams.forEach(s => {
    const t = Math.max(0, Number(tonnes[s.id]) || 0)
    month += s.rate * t
    disposal += s.dispose * t
  })
  return { month: Math.round(month), disposal: Math.round(disposal) }
}

// ── Page ─────────────────────────────────────────────────────────
export default function CalculatorPage() {
  const [tonnes, setTonnes] = useReducer(
    (state: Tonnes, action: Partial<Tonnes>): Tonnes => ({ ...state, ...action } as Tonnes),
    undefined,
    (): Tonnes => initialTonnes(),
  )

  const { month, disposal } = totals(DEFAULT_STREAMS, tonnes)
  const monthAnim = useAnimatedNumber(month, month === totals(DEFAULT_STREAMS, initialTonnes()).month ? 900 : 550)

  const fmt = (n: number) => (n || 0).toLocaleString('en-US')

  const onReset = useCallback(() => setTonnes(initialTonnes()), [])

  return (
    <div style={{ background: 'var(--mineral)', minHeight: '100vh' }}>
      <Header activePath="/calculator" />

      {/* ── HERO + LIVE WORTH ─────────────────────────────────── */}
      <section style={{ borderBottom: '1px solid var(--line-heavy)' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: 'clamp(60px,8vw,108px) var(--px) clamp(40px,5vw,64px)' }}>
          <RevealOnScroll>
            <h1 className="disp" style={{ fontSize: 'clamp(40px,6.4vw,88px)', lineHeight: .96, margin: 0, maxWidth: '16ch' }}>
              What is your business waste{' '}
              <span style={{ fontStyle: 'italic', color: 'var(--brass)' }}>actually worth?</span>
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={1}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(17px,1.8vw,21px)', lineHeight: 1.58, color: 'var(--forest)', margin: 'clamp(26px,3vw,38px) 0 0', maxWidth: '56ch' }}>
              Set the tonnage you generate each month, by stream. This estimates the recoverable value you could sell back into the market — against the disposal you currently pay to bury it.
            </p>
          </RevealOnScroll>
        </div>

        {/* Live readout */}
        <RevealOnScroll delay={1} style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 var(--px) clamp(48px,6vw,72px)' }}>
          <div className="worthrow" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 40, borderTop: '1px solid var(--ink)', paddingTop: 'clamp(26px,3vw,36px)' }}>
            <style>{`@media(max-width:760px){.worthrow{flex-direction:column!important;align-items:flex-start!important;gap:24px!important;}}`}</style>
            <div>
              <span className="mono" style={{ fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--copper)' }}>Recoverable value, estimated</span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginTop: 14 }}>
                <span className="mono" style={{ fontSize: 'clamp(16px,1.5vw,20px)', color: 'var(--copper)' }}>SAR</span>
                <span className="mono" style={{ fontSize: 'clamp(56px,9vw,120px)', fontWeight: 400, letterSpacing: '-.045em', lineHeight: .82, color: 'var(--ink)' }}>
                  {fmt(monthAnim)}
                </span>
              </div>
              <p className="mono" style={{ fontSize: 13, color: 'var(--muted-nav)', margin: '16px 0 0' }}>
                per month &nbsp;·&nbsp; SAR {fmt(monthAnim * 12)} a year
              </p>
            </div>
            <div style={{ textAlign: 'right', paddingBottom: 6 }}>
              <span className="mono" style={{ fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--rust)' }}>Disposal you pay now</span>
              <div className="mono" style={{ fontSize: 'clamp(24px,3vw,34px)', color: 'var(--rust)', marginTop: 12, letterSpacing: '-.02em' }}>
                SAR {fmt(disposal)}<span style={{ fontSize: 14, color: 'var(--muted-nav)' }}>/mo</span>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* ── CONSOLE ─────────────────────────────────────────────── */}
      <main style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: 'clamp(48px,6vw,80px) var(--px) clamp(56px,7vw,96px)' }}>
        <RevealOnScroll style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 'clamp(18px,2vw,26px)' }}>
          <h2 className="disp" style={{ fontSize: 'clamp(24px,3vw,38px)', lineHeight: 1, margin: 0 }}>Set what you generate, monthly.</h2>
          <button onClick={onReset} className="mono" style={{ fontSize: 12, letterSpacing: '.08em', textTransform: 'uppercase', background: 'transparent', color: 'var(--muted-nav)', border: '1px solid var(--line)', padding: '9px 15px', cursor: 'pointer' }}>
            Reset to example
          </button>
        </RevealOnScroll>

        <RevealOnScroll style={{ borderTop: '1px solid var(--line-heavy)' }}>
          <style>{`
            .calc-thead{display:grid;grid-template-columns:1.7fr 8rem 7rem 9rem 9rem;gap:clamp(14px,2vw,28px);padding:12px 0;border-bottom:1px solid var(--line);font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--copper);}
            .calc-row{display:grid;grid-template-columns:1.7fr 8rem 7rem 9rem 9rem;gap:clamp(14px,2vw,28px);align-items:center;padding:clamp(16px,1.9vw,22px) 0;border-bottom:1px solid #EBE3D4;transition:background .16s;}
            .calc-row:hover{background:var(--mineral-hover);}
            .tnum{appearance:none;font-family:var(--font-mono);font-size:15px;font-variant-numeric:tabular-nums;color:var(--ink);background:transparent;border:0;border-bottom:1px solid var(--ink);padding:0 2px 5px;width:5ch;text-align:right;}
            .tnum:focus-visible{outline:none;border-bottom-color:var(--brass);}
            .contribbar{transition:width .55s cubic-bezier(.16,.7,.3,1);}
            @media(max-width:760px){
              .calc-thead{display:none!important;}
              .calc-row{grid-template-columns:1fr auto!important;grid-template-areas:'name val' 'meta meta' 'bar bar'!important;row-gap:10px!important;padding:18px 0!important;}
              .c-rate,.c-input-wrap{display:none!important;}
              .c-name{grid-area:name;}.c-val{grid-area:val;text-align:right!important;}.c-meta{grid-area:meta;}.c-bar{grid-area:bar;}
            }
          `}</style>

          {/* table header */}
          <div className="calc-thead mono">
            <span>Material stream</span>
            <span style={{ textAlign: 'right' }}>SAR / tonne</span>
            <span style={{ textAlign: 'right' }}>Tonnes / mo</span>
            <span style={{ textAlign: 'right' }}>Value / mo</span>
            <span style={{ textAlign: 'right' }}>Share</span>
          </div>

          {/* rows */}
          {DEFAULT_STREAMS.map(s => {
            const t = Math.max(0, Number(tonnes[s.id]) || 0)
            const v = Math.round(s.rate * t)
            const sharePct = month > 0 ? Math.round(v / month * 100) : 0
            return (
              <div key={s.id} className="calc-row">
                <span className="c-name disp" style={{ display: 'inline-flex', alignItems: 'center', gap: 14, fontSize: 'clamp(18px,1.9vw,23px)' }}>
                  <span style={{ width: 11, height: 11, background: s.color, flexShrink: 0 }} />
                  {s.label}
                </span>
                <span className="c-rate mono" style={{ textAlign: 'right', fontSize: 14, color: 'var(--muted-nav)' }}>
                  {s.rate.toLocaleString('en-US')}
                </span>
                <span className="c-input-wrap" style={{ textAlign: 'right' }}>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={tonnes[s.id]}
                    aria-label={`${s.label} tonnes per month`}
                    className="tnum"
                    onChange={e => setTonnes({ [s.id]: Number(e.target.value) })}
                  />
                </span>
                <span className="c-val mono" style={{ textAlign: 'right', fontSize: 'clamp(15px,1.5vw,18px)', color: v > 0 ? 'var(--ink)' : 'var(--placeholder)' }}>
                  {v > 0 ? `SAR ${fmt(v)}` : '—'}
                </span>
                <span className="c-bar" style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'flex-end' }}>
                  <span style={{ flex: 1, maxWidth: 120, height: 6, background: '#E1D9C9', overflow: 'hidden' }}>
                    <span className="contribbar" style={{ display: 'block', height: '100%', width: `${sharePct}%`, background: s.color }} />
                  </span>
                  <span className="mono" style={{ fontSize: 12, color: 'var(--muted-nav)', width: '3.5ch', textAlign: 'right' }}>{sharePct}</span>
                </span>
                <span className="c-meta mono" style={{ display: 'none', fontSize: 12, color: 'var(--muted-nav)' }}>
                  {s.rate.toLocaleString('en-US')} · {tonnes[s.id]} t/mo
                </span>
              </div>
            )
          })}
        </RevealOnScroll>

        <RevealOnScroll style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 'clamp(28px,3.4vw,44px)' }}>
          <Link href="/directory" className="btn-ink">Find a licensed buyer</Link>
          <Link href="/compliance" className="btn-line">Check your obligations first</Link>
        </RevealOnScroll>

        <RevealOnScroll>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, lineHeight: 1.7, color: 'var(--muted-nav)', margin: 'clamp(36px,4vw,56px) 0 0', maxWidth: '70ch', borderTop: '1px solid var(--line)', paddingTop: 'clamp(24px,3vw,32px)' }}>
            Each stream carries an indicative per-tonne recovery value based on Gulf market rates for commercial-grade material.
            The recoverable figure is what a buyer might pay; the disposal figure is the haulage and tipping cost you avoid by diverting it.
            Both are estimates to size the opportunity — a licensed provider gives you a firm quote against your actual material.{' '}
            <Link href="/compliance" style={{ textDecoration: 'underline', textUnderlineOffset: 2, textDecorationColor: 'var(--line)' }}>Compliance obligations</Link>{' '}
            apply regardless of value.
          </p>
        </RevealOnScroll>
      </main>

      <Footer />
    </div>
  )
}
