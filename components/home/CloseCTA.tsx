import Link from 'next/link'
import RevealOnScroll from '@/components/ui/RevealOnScroll'

export default function CloseCTA() {
  return (
    <section>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: 'clamp(72px,10vw,132px) var(--px)' }}>
        <RevealOnScroll>
          <div className="closegrid" style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr', gap: 'clamp(32px,5vw,72px)', alignItems: 'end' }}>
            <style>{`@media(max-width:820px){.closegrid{grid-template-columns:1fr!important;}}`}</style>
            <h2 className="disp" style={{ fontSize: 'clamp(32px,4.8vw,66px)', lineHeight: 1, margin: 0, maxWidth: '16ch' }}>
              Waste you can no longer bury cheaply is waste worth{' '}
              <span style={{ fontStyle: 'italic', color: 'var(--brass)' }}>recovering.</span>
            </h2>
            <div>
              <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--muted-nav)', margin: '0 0 24px' }}>
                Start with the rules that apply to you, then put a number on what you&rsquo;re throwing away.
              </p>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <Link href="/compliance" className="btn-ink">Read the compliance guide</Link>
                <Link href="/calculator" className="btn-line">Open the calculator</Link>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
