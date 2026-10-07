import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import KickerLabel from '@/components/ui/KickerLabel'
import ThreeSpokes from '@/components/home/ThreeSpokes'
import PressureSpread from '@/components/home/PressureSpread'
import CloseCTA from '@/components/home/CloseCTA'
import ValueAxis from '@/components/home/ValueAxis'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Gulf business waste, valued and compliant',
  description:
    'Most businesses pay to throw away what they could sell. A plain, evidence-led guide to turning Gulf business waste into value — and staying on the right side of the law.',
  path: '/',
})

export default function HomePage() {
  return (
    <div style={{ background: 'var(--mineral)', minHeight: '100vh' }}>
      <Header activePath="/" />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="herofull" style={{ borderBottom: '1px solid var(--line-heavy)', overflow: 'hidden', position: 'relative' }}>
        <style>{`
          .herogrid{max-width:var(--max-w);margin:0 auto;padding-left:var(--px);display:grid;grid-template-columns:1.2fr 1fr;column-gap:clamp(28px,3.5vw,60px);align-items:center;min-height:clamp(460px,50vw,620px);}
          .herotext{padding:clamp(40px,5vw,76px) 0;}
          .heroimgcell{position:relative;align-self:stretch;margin-right:min(0px,calc(var(--max-w) - 100vw) / 2);}
          .heroimg{-webkit-mask-image:linear-gradient(90deg,transparent 0,#000 15%);mask-image:linear-gradient(90deg,transparent 0,#000 15%);}
          .corner-label{position:absolute;top:clamp(18px,2.4vw,30px);right:clamp(18px,2.6vw,36px);z-index:3;text-align:right;font-family:var(--font-mono);font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted-meta);line-height:1.55;}
          .price-card{position:absolute;right:clamp(18px,3vw,44px);bottom:clamp(40px,6vw,84px);z-index:3;background:rgba(248,245,239,.95);backdrop-filter:blur(2px);-webkit-backdrop-filter:blur(2px);padding:16px 20px;box-shadow:0 16px 46px -16px rgba(22,33,29,.42);}
          @media(max-width:820px){
            .herogrid{grid-template-columns:1fr;padding-left:0;min-height:0;}
            .herotext{padding:clamp(36px,9vw,56px) var(--px) clamp(26px,7vw,38px);}
            .heroimgcell{height:clamp(300px,74vw,440px);margin-right:0;}
            .heroimg{-webkit-mask-image:none!important;mask-image:none!important;object-position:center;}
            .corner-label,.leader-svg{display:none;}
            .price-card{right:16px;bottom:16px;}
          }
        `}</style>

        <div className="herogrid">
          <div className="herotext">
            <RevealOnScroll as="div">
              <KickerLabel number="01">Waste has a higher value</KickerLabel>
            </RevealOnScroll>
            <RevealOnScroll as="div">
              <h1 className="disp" style={{ fontSize: 'clamp(40px,5.8vw,86px)', lineHeight: .98, margin: 0, letterSpacing: '-.015em' }}>
                Most businesses pay to throw away{' '}
                <span style={{ fontStyle: 'italic', color: 'var(--brass)' }}>what they could sell.</span>
              </h1>
            </RevealOnScroll>
            <RevealOnScroll delay={1}>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(16px,1.7vw,21px)', lineHeight: 1.56, color: 'var(--forest)', margin: 'clamp(26px,3vw,38px) 0 0', maxWidth: '46ch' }}>
                A plain, evidence-led guide to turning Gulf business waste into value — and staying on the right side of the law. Every figure recoverable, every regulatory claim sourced.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={1} style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap', marginTop: 'clamp(28px,3.4vw,42px)' }}>
              <Link href="/calculator" className="btn-ink">
                Estimate your waste&rsquo;s worth <span className="mono">&rarr;</span>
              </Link>
              <Link href="/compliance" className="navlink" style={{ fontSize: 14.5, color: 'var(--ink)', display: 'inline-flex', alignItems: 'center', gap: 9 }}>
                Start with the rules <span className="mono">&rarr;</span>
              </Link>
            </RevealOnScroll>
          </div>

          <div className="heroimgcell">
            <Image
              src="/assets/materials-portrait.png"
              alt="Six waste material specimens laid in strips, cool to warm — crushed concrete, organic matter, cardboard, plastic flake, circuit boards, and copper wire"
              fill
              className="heroimg"
              style={{ objectFit: 'cover', objectPosition: '50% 50%' }}
              priority
              sizes="(max-width:820px) 100vw, 50vw"
            />
            <div className="corner-label">Recoverable material<br />/ 05</div>
            {/* price card */}
            <div className="price-card">
              <div className="mono" style={{ fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--copper)' }}>Metals &amp; aluminium</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 8 }}>
                <span className="disp mono" style={{ fontSize: 'clamp(26px,3vw,36px)', color: 'var(--ink)', letterSpacing: '-.02em' }}>3,500</span>
                <span className="mono" style={{ fontSize: 12, color: 'var(--muted-nav)' }}>SAR</span>
              </div>
              <div className="mono" style={{ fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--placeholder)', marginTop: 4 }}>per tonne recovered</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUE AXIS ───────────────────────────────────────── */}
      <ValueAxis />

      {/* ── THREE SPOKES + CLOSE + DARK SPREAD ───────────────── */}
      <main style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 var(--px)' }}>
        <ThreeSpokes />
      </main>

      <PressureSpread />

      <CloseCTA />

      <Footer />
    </div>
  )
}
