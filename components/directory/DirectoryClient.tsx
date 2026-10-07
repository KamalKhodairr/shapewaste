'use client'

import { useState, useMemo } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import LicenseNote from '@/components/directory/LicenseNote'
import Link from 'next/link'
import { MAT_COLOR, ALL_REGIONS, ALL_MATERIALS, Provider } from '@/lib/data/providers'

export default function DirectoryClient({ providers }: { providers: Provider[] }) {
  const [region, setRegion] = useState('all')
  const [material, setMaterial] = useState('all')
  const [licensedOnly, setLicensedOnly] = useState(false)

  const results = useMemo(() => providers.filter(p =>
    (region === 'all' || p.region === region) &&
    (material === 'all' || p.materials.includes(material)) &&
    (!licensedOnly || p.licensed)
  ), [providers, region, material, licensedOnly])

  const filtersActive = region !== 'all' || material !== 'all' || licensedOnly
  const ksaRegions = new Set(['Riyadh', 'Jeddah', 'Dammam'])

  const selStyle: React.CSSProperties = {
    appearance: 'none',
    WebkitAppearance: 'none',
    fontFamily: 'var(--font-sans)',
    fontSize: 13.5,
    fontWeight: 500,
    color: 'var(--ink)',
    background: '#EFE9DE',
    border: '1px solid var(--line)',
    padding: '9px 34px 9px 13px',
    cursor: 'pointer',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%236B6F6A' stroke-width='1.4' fill='none'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
  }

  return (
    <div style={{ background: 'var(--mineral)', minHeight: '100vh' }}>
      <Header activePath="/directory" />

      {/* HERO */}
      <section style={{ borderBottom: '1px solid var(--line-heavy)' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: 'clamp(48px,6vw,84px) var(--px) clamp(44px,5vw,64px)' }}>
          <RevealOnScroll>
            <h1 className="disp" style={{ fontSize: 'clamp(38px,5.6vw,80px)', lineHeight: .98, margin: 0, maxWidth: '16ch' }}>
              Licensed waste providers in the Gulf
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={1}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(17px,1.8vw,21px)', lineHeight: 1.58, color: 'var(--forest)', margin: 'clamp(24px,3vw,34px) 0 0', maxWidth: '60ch' }}>
              Choosing a licensed provider is a compliance decision, not a procurement one — using an unlicensed contractor makes you jointly liable for any damage. Filter by region, material, and licence status.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <main style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: 'clamp(32px,4vw,52px) var(--px) clamp(56px,7vw,96px)' }}>
        {/* Filter bar */}
        <RevealOnScroll style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', marginBottom: 'clamp(20px,2.4vw,28px)' }}>
          <select value={region} onChange={e => setRegion(e.target.value)} style={selStyle} aria-label="Region">
            <option value="all">All regions</option>
            {ALL_REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <select value={material} onChange={e => setMaterial(e.target.value)} style={selStyle} aria-label="Material">
            <option value="all">All materials</option>
            {ALL_MATERIALS.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <button
            onClick={() => setLicensedOnly(v => !v)}
            className="mono"
            style={{
              fontSize: 12, letterSpacing: '.06em', textTransform: 'uppercase',
              padding: '9px 15px',
              border: `1px solid ${licensedOnly ? 'var(--ink)' : 'var(--line)'}`,
              background: licensedOnly ? 'var(--ink)' : '#EFE9DE',
              color: licensedOnly ? 'var(--mineral)' : 'var(--muted-nav)',
              display: 'inline-flex', alignItems: 'center', gap: 9, cursor: 'pointer',
              transition: 'border-color .16s, background .16s, color .16s',
            }}
          >
            <span style={{ width: 14, height: 14, border: '1px solid currentColor', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>
              {licensedOnly ? '\u2713' : ''}
            </span>
            Licensed only
          </button>
          {filtersActive && (
            <button onClick={() => { setRegion('all'); setMaterial('all'); setLicensedOnly(false) }}
              className="mono" style={{ fontSize: 12, letterSpacing: '.06em', textTransform: 'uppercase', background: 'transparent', border: 0, color: 'var(--muted-nav)', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 3 }}>
              Clear
            </button>
          )}
          <span className="mono" style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--muted-nav)', letterSpacing: '.04em' }}>
            <b style={{ color: 'var(--ink)' }}>{results.length}</b> / {providers.length} providers
          </span>
        </RevealOnScroll>

        {/* Provider list */}
        <RevealOnScroll style={{ borderTop: '1px solid var(--line-heavy)' }}>
          <style>{`
            .prow{transition:background .16s;}
            .prow:hover{background:var(--mineral-hover);}
            .prow:hover .viewbtn{border-color:var(--ink);}
            .viewbtn{transition:border-color .16s;}
            @media(max-width:720px){.prow{grid-template-columns:1fr!important;gap:14px!important;align-items:start!important;}.prow-right{width:100%;justify-content:space-between!important;}}
          `}</style>
          {results.length === 0 && (
            <div style={{ padding: '56px 0', textAlign: 'center' }}>
              <p className="disp" style={{ fontSize: 22, margin: '0 0 8px' }}>No providers match those filters yet.</p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14.5, color: 'var(--muted-nav)', margin: 0 }}>
                The directory is seeded and growing.{' '}
                <button onClick={() => { setRegion('all'); setMaterial('all'); setLicensedOnly(false) }}
                  style={{ background: 'none', border: 0, cursor: 'pointer', textDecoration: 'underline', color: 'inherit', padding: 0 }}>
                  Clear filters
                </button>{' '}or check back as we add coverage.
              </p>
            </div>
          )}
          {results.map(p => {
            const badge = p.licensed ? (ksaRegions.has(p.region) ? 'MWAN-licensed' : p.licenceBody ? `${p.licenceBody} licensed` : 'Licensed') : 'Unlicensed'
            const badgeColor = p.licensed ? 'var(--badge-green)' : 'var(--rust)'
            return (
              <div key={p._id} className="prow" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 24, alignItems: 'center', padding: 'clamp(18px,2.2vw,26px) 0', borderBottom: '1px solid #EBE3D4' }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, flexWrap: 'wrap' }}>
                    <span className="disp" style={{ fontSize: 'clamp(19px,2vw,25px)' }}>{p.name}</span>
                    <span className="mono" style={{ fontSize: 11, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--muted-nav)' }}>{p.region}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
                    {p.materials.map(m => (
                      <span key={m} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 12, color: 'var(--forest)', border: '1px solid var(--line)', padding: '4px 10px' }}>
                        <span style={{ width: 8, height: 8, background: MAT_COLOR[m] || '#6E8250', flexShrink: 0 }} />{m}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="prow-right" style={{ display: 'flex', alignItems: 'center', gap: 20, flexShrink: 0 }}>
                  <span className="mono" style={{ fontSize: 11.5, letterSpacing: '.05em', textTransform: 'uppercase', color: badgeColor, display: 'inline-flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: badgeColor, flexShrink: 0 }} />{badge}
                  </span>
                  <Link href={`/directory/${p._id}`} className="viewbtn" style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--ink)', border: '1px solid var(--line)', padding: '9px 18px', whiteSpace: 'nowrap' }}>View</Link>
                </div>
              </div>
            )
          })}
        </RevealOnScroll>

        <LicenseNote />
      </main>

      <Footer />
    </div>
  )
}
