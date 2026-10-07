interface KickerLabelProps {
  children: React.ReactNode
  number?: string
}

export default function KickerLabel({ children, number }: KickerLabelProps) {
  return (
    <div className="mono" style={{
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      color: 'var(--copper)',
      fontSize: 11,
      letterSpacing: '.18em',
      textTransform: 'uppercase',
      marginBottom: 'clamp(20px,2.4vw,30px)',
    }}>
      <span>{children}</span>
      <span style={{ height: 1, flex: 1, maxWidth: 70, background: 'var(--line-dim)' }} />
      {number && <span style={{ color: 'var(--ink)' }}>{number}</span>}
    </div>
  )
}
