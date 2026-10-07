interface TocItem { label: string; anchor: string }

interface TableOfContentsProps {
  items: TocItem[]
  related?: { label: string; href: string }[]
}

export default function TableOfContents({ items, related }: TableOfContentsProps) {
  return (
    <>
      <p className="mono" style={{ fontSize: 10.5, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--copper)', margin: '0 0 16px' }}>On this page</p>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 13, borderLeft: '1px solid var(--line)' }}>
        {items.map(item => (
          <a key={item.anchor} href={`#${item.anchor}`} className="toclink">{item.label}</a>
        ))}
      </nav>
      {related && related.length > 0 && (
        <div style={{ marginTop: 28, paddingTop: 22, borderTop: '1px solid var(--line)' }}>
          <p className="mono" style={{ fontSize: 10.5, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--copper)', margin: '0 0 16px' }}>Related</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {related.map(r => (
              <a key={r.href} href={r.href} style={{ fontSize: 13.5, color: 'var(--forest)' }}>{r.label}</a>
            ))}
          </div>
        </div>
      )}
      <style>{`
        .toclink{font-size:13px;color:var(--muted-nav);transition:color .16s;padding-left:14px;border-left:2px solid transparent;margin-left:-1px;line-height:1.4;display:block;}
        .toclink:hover{color:var(--ink);border-left-color:var(--brass);}
      `}</style>
    </>
  )
}
