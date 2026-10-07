export default function SourceNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="mono" style={{ fontSize: 11.5, color: 'var(--muted-nav)', marginTop: 36, lineHeight: 1.7, maxWidth: '66ch', letterSpacing: '.02em' }}>
      {children}
    </p>
  )
}
