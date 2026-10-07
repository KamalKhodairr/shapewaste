import Link from 'next/link'

const NAV = [
  { href: '/compliance', label: 'Compliance' },
  { href: '/calculator',  label: 'Waste-to-Value' },
  { href: '/directory',   label: 'Directory' },
  { href: '/answers',     label: 'Answers' },
]

interface HeaderProps { activePath?: string }

export default function Header({ activePath = '' }: HeaderProps) {
  return (
    <header style={{ borderBottom: '1px solid var(--line-heavy)' }}>
      <div style={{
        maxWidth: 'var(--max-w)',
        margin: '0 auto',
        padding: 'clamp(22px,3vw,30px) var(--px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 24,
        flexWrap: 'wrap',
      }}>
        <Link href="/">
          <span className="disp" style={{ fontSize: 26, color: 'var(--ink)' }}>shapewaste</span>
        </Link>
        <nav style={{ display: 'flex', gap: 'clamp(20px,3vw,38px)', alignItems: 'center' }}>
          {NAV.map(({ href, label }) => {
            const isActive = activePath === href || (href !== '/' && activePath.startsWith(href))
            return (
              <Link
                key={href}
                href={href}
                className={`navlink${isActive ? ' active' : ''}`}
              >
                {label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
