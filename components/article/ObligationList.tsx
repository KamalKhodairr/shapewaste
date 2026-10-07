interface Obligation { heading: string; detail: string }

export default function ObligationList({ items }: { items: Obligation[] }) {
  return (
    <div style={{ margin: '4px 0 8px', maxWidth: '66ch' }}>
      {items.map((item, i) => (
        <div key={i} style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gap: 18,
          alignItems: 'start',
          padding: '18px 0',
          borderTop: '1px solid var(--line)',
          borderBottom: i === items.length - 1 ? '1px solid var(--line)' : undefined,
        }}>
          <span className="disp" style={{ fontSize: 22, color: 'var(--brass)' }}>
            {String(i + 1).padStart(2, '0')}
          </span>
          <span style={{ fontSize: 16.5, lineHeight: 1.6, color: 'var(--forest)' }}>
            <strong style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>{item.heading}</strong>
            {' '}{item.detail}
          </span>
        </div>
      ))}
    </div>
  )
}
