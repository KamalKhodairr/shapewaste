import React from 'react'
import RevealOnScroll from '@/components/ui/RevealOnScroll'

const STATS = [
  { figure: 'SAR 30M', copy: 'Maximum penalty under Article 29 of Saudi Arabia\'s Waste Management Law — plus up to 10 years\u2019 imprisonment.' },
  { figure: 'Jointly liable', copy: 'Hand waste to an unlicensed contractor and you share legal responsibility for the damage. It cannot be outsourced.' },
  { figure: '80% by 2030', copy: 'Abu Dhabi\'s Tadweer landfill-diversion target. Pressure across the Gulf is rising, not easing.' },
]

export default function PressureSpread() {
  return (
    <section style={{
      background: 'var(--petrol)',
      color: '#EDE7DB',
      borderTop: '1px solid var(--line-heavy)',
      borderBottom: '1px solid var(--line-heavy)',
      marginTop: 'clamp(72px,10vw,132px)',
    }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: 'clamp(64px,8vw,112px) var(--px)' }}>
        <RevealOnScroll style={{ marginBottom: 'clamp(44px,5vw,68px)', maxWidth: '34ch' }}>
          <h2 className="disp" style={{ fontSize: 'clamp(28px,3.6vw,46px)', lineHeight: 1.08, margin: 0 }}>
            Regulation is tightening while the same material is worth more recovered than buried.
          </h2>
        </RevealOnScroll>
        <RevealOnScroll>
          <div className="statspread" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1px 1fr 1px 1fr',
            gap: 'clamp(28px,4vw,56px)',
            borderTop: '1px solid var(--line-petrol)',
            paddingTop: 'clamp(32px,4vw,48px)',
          }}>
            <style>{`
              @media(max-width:820px){
                .statspread{grid-template-columns:1fr!important;gap:36px!important;}
                .statspread .vr{display:none!important;}
              }
            `}</style>
            {STATS.map((s, i) => (
              <React.Fragment key={i}>
                <div>
                  <div className="disp" style={{ fontSize: 'clamp(40px,5.5vw,70px)', lineHeight: .9, color: 'var(--gold)' }}>{s.figure}</div>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14.5, color: 'var(--muted-dark)', margin: '20px 0 0', lineHeight: 1.62, maxWidth: '32ch' }}>{s.copy}</p>
                </div>
                {i < STATS.length - 1 && <div className="vr" style={{ background: 'var(--line-petrol)', width: 1, height: '100%' }} />}
              </React.Fragment>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
