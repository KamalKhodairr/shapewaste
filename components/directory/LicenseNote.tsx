import Link from 'next/link'

export default function LicenseNote() {
  return (
    <div style={{
      background: 'var(--petrol)',
      color: '#EDE7DB',
      padding: 'clamp(24px,3vw,32px)',
      marginTop: 'clamp(24px,3vw,32px)',
      maxWidth: '76ch',
      display: 'flex',
      gap: 16,
      alignItems: 'flex-start',
    }}>
      <span style={{ width: 9, height: 9, background: '#6E8250', flexShrink: 0, marginTop: 7 }} />
      <p style={{ margin: 0, fontFamily: 'var(--font-sans)', fontSize: 14.5, lineHeight: 1.66, color: 'var(--muted-dark)' }}>
        A <span style={{ color: '#EDE7DB', fontWeight: 500 }}>licensed</span> badge means the provider holds the relevant
        activity-specific authorisation (MWAN in Saudi Arabia; emirate authorities in the UAE).
        Always confirm the licence covers the exact activity — transport, treatment, or disposal — you&rsquo;re contracting for.{' '}
        <Link href="/compliance/ksa" style={{ color: 'var(--gold)', textDecoration: 'underline', textUnderlineOffset: 2 }}>
          Why licence status decides your liability
        </Link>.
      </p>
    </div>
  )
}
