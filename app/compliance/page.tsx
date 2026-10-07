import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import Link from 'next/link'
import { buildMetadata, breadcrumbSchema } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Gulf waste compliance: what Saudi & UAE businesses must do',
  description: 'A plain-English guide to waste rules for businesses in Saudi Arabia and the UAE — the laws, who enforces them, the penalties, and how to stay compliant.',
  path: '/compliance',
})

const GUIDES = [
  {
    slug: 'ksa',
    jurisdiction: 'Saudi Arabia',
    code: 'KSA',
    title: 'Saudi Arabia Waste Management Law',
    intro: 'Since November 2021, every business in Saudi Arabia that produces waste has been a regulated waste producer. Non-compliance carries some of the heaviest environmental penalties in the region.',
    cta: 'Read the guide',
  },
  {
    slug: 'uae',
    jurisdiction: 'UAE',
    code: 'UAE',
    title: 'UAE Federal Law 12 of 2018',
    intro: 'Federal Law No. 12 of 2018 is the national backbone for waste management in the UAE, with emirate-level rules layered on top. Producers and suppliers bear direct responsibility for post-use products.',
    cta: 'Read the guide',
  },
  {
    slug: 'epr',
    jurisdiction: 'UAE',
    code: 'UAE',
    title: 'UAE Extended Producer Responsibility (EPR)',
    intro: 'EPR is the biggest change to the UAE\u2019s waste rules in a generation, targeting manufacturers, importers, and brand owners for packaging, electronics, and batteries.',
    cta: 'Read the EPR guide',
  },
]

export default function ComplianceHubPage() {
  return (
    <div style={{ background: 'var(--mineral)', minHeight: '100vh' }}>
      <Header activePath="/compliance" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Compliance', url: '/compliance' }])) }} />

      {/* HERO */}
      <section style={{ borderBottom: '1px solid var(--line-heavy)' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: 'clamp(48px,6vw,84px) var(--px) clamp(44px,5vw,64px)' }}>
          <RevealOnScroll>
            <div className="mono" style={{ fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--copper)', marginBottom: 'clamp(22px,2.6vw,28px)' }}>Compliance</div>
          </RevealOnScroll>
          <RevealOnScroll>
            <h1 className="disp" style={{ fontSize: 'clamp(38px,5.6vw,80px)', lineHeight: .98, margin: 0, maxWidth: '18ch' }}>
              Gulf waste compliance
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={1}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(17px,1.8vw,21px)', lineHeight: 1.58, color: 'var(--forest)', margin: 'clamp(24px,3vw,34px) 0 0', maxWidth: '62ch' }}>
              If your business generates waste in Saudi Arabia or the UAE — and nearly every business does — you are a regulated party. Both countries rewrote their waste rules in the last few years, shifting responsibility onto the businesses that produce waste, not just the municipalities that collect it.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Guides index */}
      <main style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: 'clamp(56px,7vw,96px) var(--px)' }}>
        <RevealOnScroll style={{ borderTop: '1px solid var(--line-heavy)' }}>
          <style>{`
            .guide-row{display:grid;grid-template-columns:auto 1fr auto;gap:clamp(28px,4vw,52px);align-items:start;padding:clamp(32px,3.6vw,48px) 0;border-bottom:1px solid var(--line);transition:background .2s;}
            .guide-row:hover{background:var(--mineral-hover);}
            @media(max-width:720px){.guide-row{grid-template-columns:1fr;gap:16px;}.guide-num{font-size:clamp(28px,8vw,42px)!important;}}
          `}</style>
          {GUIDES.map((g, i) => (
            <Link key={g.slug} href={`/compliance/${g.slug}`} className="guide-row" style={{ textDecoration: 'none', color: 'inherit', display: 'grid' } as React.CSSProperties}>
              <span className="disp guide-num" style={{ fontSize: 'clamp(36px,4vw,52px)', color: 'var(--brass)', lineHeight: 1 }}>{String(i + 1).padStart(2, '0')}</span>
              <div>
                <div className="mono" style={{ fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--copper)', marginBottom: 10 }}>{g.jurisdiction}</div>
                <h2 className="disp" style={{ fontSize: 'clamp(22px,2.6vw,32px)', lineHeight: 1.08, margin: '0 0 14px' }}>{g.title}</h2>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, lineHeight: 1.65, color: 'var(--muted-nav)', margin: 0, maxWidth: '58ch' }}>{g.intro}</p>
              </div>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9, fontSize: 13.5, fontWeight: 500, paddingTop: 6, whiteSpace: 'nowrap' }}>
                {g.cta} <span className="mono">&rarr;</span>
              </span>
            </Link>
          ))}
        </RevealOnScroll>

        {/* Dark CTA panel */}
        <RevealOnScroll style={{ background: 'var(--petrol)', color: '#EDE7DB', padding: 'clamp(36px,4.5vw,56px)', marginTop: 'clamp(56px,7vw,88px)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 32, flexWrap: 'wrap' }}>
            <div>
              <p className="mono" style={{ fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted-dark)', margin: '0 0 16px' }}>Maximum penalty</p>
              <div className="disp" style={{ fontSize: 'clamp(38px,5vw,64px)', color: 'var(--gold)', lineHeight: .9, marginBottom: 16 }}>SAR 30M</div>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, color: 'var(--muted-dark)', margin: 0, maxWidth: '44ch', lineHeight: 1.6 }}>
                Under Article 29 of Saudi Arabia&rsquo;s Waste Management Law — plus up to 10 years&rsquo; imprisonment. Liability can follow you even when a contractor does the damage.
              </p>
            </div>
            <Link href="/directory" className="btn-ink" style={{ background: 'var(--mineral)', color: 'var(--ink)', borderColor: 'var(--mineral)', flexShrink: 0 }}>
              Find licensed providers
            </Link>
          </div>
        </RevealOnScroll>
      </main>

      <Footer />
    </div>
  )
}
