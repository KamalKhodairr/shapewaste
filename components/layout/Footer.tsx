import Link from 'next/link'

const FOOTER_NAV = [
  { href: '/compliance', label: 'Compliance' },
  { href: '/calculator',  label: 'Calculator' },
  { href: '/directory',   label: 'Directory' },
  { href: '/answers',     label: 'Answers' },
]

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--line-heavy)' }}>
      <div style={{
        maxWidth: 'var(--max-w)',
        margin: '0 auto',
        padding: '32px var(--px)',
        display: 'flex',
        justifyContent: 'space-between',
        gap: 16,
        flexWrap: 'wrap',
        fontSize: 12.5,
        color: 'var(--muted-nav)',
      }}>
        <span className="mono">shapewaste — the commercial &amp; compliance case for Gulf business waste.</span>
        <span style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {FOOTER_NAV.map(({ href, label }) => (
            <Link key={href} href={href} className="navlink">{label}</Link>
          ))}
        </span>
      </div>
    </footer>
  )
}
