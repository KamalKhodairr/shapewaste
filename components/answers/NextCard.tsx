import Link from 'next/link'

export default function NextCard() {
  return (
    <div className="nextcard" style={{
      display: 'flex',
      justifyContent: 'space-between',
      gap: 24,
      alignItems: 'center',
      flexWrap: 'wrap',
      background: 'var(--mineral-hover)',
      padding: 'clamp(24px,3vw,32px)',
      marginTop: 'clamp(30px,3.4vw,44px)',
    }}>
      <style>{`@media(max-width:860px){.nextcard{flex-direction:column!important;align-items:flex-start!important;}}`}</style>
      <div>
        <p className="disp" style={{ fontSize: 'clamp(20px,2.2vw,26px)', margin: '0 0 8px' }}>Value &amp; material questions are next.</p>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, color: 'var(--muted-nav)', margin: 0, maxWidth: '54ch', lineHeight: 1.6 }}>
          How much is my waste worth? Is recycling profitable in the Gulf? Where can I recycle commercial plastic?
        </p>
      </div>
      <Link href="/calculator" className="btn-ink" style={{ flexShrink: 0 }}>Try the calculator</Link>
    </div>
  )
}
