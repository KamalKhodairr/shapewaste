import { PortableText, PortableTextComponents } from '@portabletext/react'
import PetrolPanel from '@/components/ui/PetrolPanel'
import ObligationList from '@/components/article/ObligationList'
import Link from 'next/link'

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p style={{ fontFamily: 'var(--font-sans)', fontSize: 17.5, lineHeight: 1.75, color: 'var(--forest)', margin: '0 0 22px', maxWidth: '65ch' }}>{children}</p>,
    h2: ({ children, value }) => {
      // Create an ID from the text to use for anchor links
      const id = value.children?.[0]?.text?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || ''
      return <h2 id={id} style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(24px,2.8vw,34px)', letterSpacing: '-.01em', margin: '48px 0 18px', scrollMarginTop: 40, lineHeight: 1.08 }}>{children}</h2>
    },
    h3: ({ children }) => <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(20px,2.2vw,26px)', margin: '32px 0 16px' }}>{children}</h3>,
  },
  marks: {
    strong: ({ children }) => <b style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, color: 'var(--ink)' }}>{children}</b>,
    em: ({ children }) => <em style={{ fontStyle: 'italic' }}>{children}</em>,
    link: ({ value, children }) => {
      const { href, internal } = value
      const style = { textDecoration: 'underline', textUnderlineOffset: 2, textDecorationColor: 'var(--line)', transition: 'text-decoration-color .16s' }
      if (internal || href?.startsWith('/')) {
        return <Link href={href} style={style}>{children}</Link>
      }
      return <a href={href} target="_blank" rel="noopener noreferrer" style={style}>{children}</a>
    },
  },
  types: {
    petrolPanel: ({ value }) => (
      <PetrolPanel 
        label={value.label} 
        figure={value.figure} 
        sublabel={value.sublabel} 
        className="my-8"
        style={{ margin: '32px 0' }}
      />
    ),
    obligationList: ({ value }) => (
      <div style={{ margin: '32px 0' }}>
        <ObligationList items={value.items} />
      </div>
    ),
    calloutBlock: ({ value }) => (
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, borderLeft: '2px solid var(--rust)', padding: '4px 0 4px 20px', margin: '32px 0', maxWidth: '66ch' }}>
        <p style={{ margin: 0, fontFamily: 'var(--font-sans)', fontSize: 16, color: 'var(--forest)', lineHeight: 1.62 }}>
          {value.text}{' '}
          {value.linkHref && <Link href={value.linkHref} style={{ color: 'var(--copper)', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: 2 }}>{value.linkLabel}</Link>}
        </p>
      </div>
    ),
  },
}

export default function PortableTextRenderer({ value }: { value: any }) {
  if (!value) return null
  return (
    <div className="rc-portable">
      <PortableText value={value} components={components} />
    </div>
  )
}
