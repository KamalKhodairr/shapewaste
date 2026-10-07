import Link from 'next/link'
import RevealOnScroll from '@/components/ui/RevealOnScroll'

const SPOKES = [
  {
    num: '01',
    href: '/compliance',
    h: 'The laws you\'re already subject to',
    p: 'Saudi\'s 2021 Waste Management Law and the UAE\'s Federal Law 12 — what applies, who enforces, the real penalties.',
    cta: 'Read the guide',
    padStyle: { paddingRight: 'clamp(24px,2.4vw,34px)', borderRight: '1px solid var(--line)' } as React.CSSProperties,
  },
  {
    num: '02',
    href: '/calculator',
    h: 'What your waste is actually worth',
    p: 'Model every stream you generate and see the value you are currently paying to bury in landfill.',
    cta: 'Run the numbers',
    padStyle: { padding: '0 clamp(24px,2.4vw,34px)', borderRight: '1px solid var(--line)' } as React.CSSProperties,
  },
  {
    num: '03',
    href: '/directory',
    h: 'Licensed providers, by stream',
    p: 'A vetted directory of Gulf recyclers — with the licence status that decides your liability.',
    cta: 'Browse providers',
    padStyle: { paddingLeft: 'clamp(24px,2.4vw,34px)' } as React.CSSProperties,
  },
]

export default function ThreeSpokes() {
  return (
    <section style={{ padding: 'clamp(72px,10vw,132px) 0 clamp(8px,2vw,24px)' }}>
      <RevealOnScroll style={{ marginBottom: 'clamp(44px,5vw,64px)' }}>
        <h2 className="disp" style={{ fontSize: 'clamp(30px,4.4vw,56px)', lineHeight: 1, margin: 0, maxWidth: '18ch' }}>
          Three ways to turn a cost into a return.
        </h2>
      </RevealOnScroll>
      <RevealOnScroll>
        <div className="idxgrid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', borderTop: '1px solid var(--ink)' }}>
          <style>{`
            @media(max-width:820px){
              .idxgrid{grid-template-columns:1fr!important;}
              .idxrow{border-right:0!important;border-bottom:1px solid var(--line)!important;padding-left:0!important;padding-right:0!important;}
            }
            .idxrow{transition:background .2s;display:flex;flex-direction:column;}
            .idxrow:hover{background:var(--mineral-hover);}
            .idxrow:hover .idxarrow{transform:translateX(6px);}
            .idxarrow{transition:transform .24s ease;}
          `}</style>
          {SPOKES.map((s) => (
            <Link key={s.href} href={s.href} className="idxrow" style={{ ...s.padStyle, padding: 'clamp(28px,3vw,40px) 0' } as React.CSSProperties}>
              <div style={{ marginBottom: 'clamp(22px,3vw,42px)' }}>
                <span className="disp" style={{ fontSize: 'clamp(36px,4vw,52px)', color: 'var(--brass)' }}>{s.num}</span>
              </div>
              <h3 className="disp" style={{ fontSize: 'clamp(21px,2.2vw,27px)', lineHeight: 1.12, margin: '0 0 12px' }}>{s.h}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--muted-nav)', margin: '0 0 24px' }}>{s.p}</p>
              <span style={{ marginTop: 'auto', fontSize: 13.5, fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 9 }}>
                {s.cta} <span className="mono idxarrow">&rarr;</span>
              </span>
            </Link>
          ))}
        </div>
      </RevealOnScroll>
    </section>
  )
}
