interface PetrolPanelProps {
  label?: string
  figure: string
  sublabel?: string
  className?: string
  style?: React.CSSProperties
}

export default function PetrolPanel({ label, figure, sublabel, className = '', style = {} }: PetrolPanelProps) {
  return (
    <div className={className} style={{
      ...style,
      background: 'var(--petrol)',
      color: '#EDE7DB',
      padding: 'clamp(28px,3.4vw,40px)',
    }}>
      {label && (
        <span className="mono" style={{ fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted-dark)' }}>
          {label}
        </span>
      )}
      <div className="disp" style={{ fontSize: 'clamp(32px,4vw,50px)', color: 'var(--gold)', lineHeight: .95, marginTop: label ? 12 : 0 }}>
        {figure}
      </div>
      {sublabel && (
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13.5, color: 'var(--muted-dark)', margin: '12px 0 0', lineHeight: 1.55 }}>
          {sublabel}
        </p>
      )}
    </div>
  )
}
