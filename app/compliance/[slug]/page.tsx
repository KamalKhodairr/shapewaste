import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import ArticleLayout from '@/components/article/ArticleLayout'
import TableOfContents from '@/components/article/TableOfContents'
import SourceNote from '@/components/article/SourceNote'
import PortableTextRenderer from '@/components/article/PortableTextRenderer'
import Link from 'next/link'
import { buildMetadata, articleSchema, breadcrumbSchema } from '@/lib/seo'
import { getComplianceGuide, getAllComplianceGuides } from '@/lib/queries'

// Fallback logic if the guides haven't been seeded yet
const FALLBACK_RELATED = [
  { label: 'Common compliance questions', href: '/answers' },
  { label: 'Find licensed providers', href: '/directory' }
]

export async function generateStaticParams() {
  const guides = await getAllComplianceGuides().catch(() => [])
  if (guides.length === 0) {
    return [{ slug: 'ksa' }, { slug: 'uae' }, { slug: 'epr' }]
  }
  return guides.map((guide: any) => ({ slug: guide.slug?.current || guide.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = await getComplianceGuide(slug).catch(() => null)
  if (!guide) return {}
  return buildMetadata({ title: guide.metaTitle || guide.title, description: guide.metaDescription, path: `/compliance/${slug}` })
}

export default async function ComplianceGuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = await getComplianceGuide(slug).catch(() => null)
  
  if (!guide) {
    // If not found in Sanity and we haven't seeded yet, show 404
    notFound()
  }

  // Ensure TOC structure matches what the component expects
  const toc = guide.toc?.map((t: any) => ({
    label: t.label,
    anchor: t.anchor
  })) || []

  return (
    <div style={{ background: 'var(--mineral)', minHeight: '100vh' }}>
      <Header activePath="/compliance" />

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema({ headline: guide.metaTitle || guide.title, description: guide.metaDescription, url: `/compliance/${slug}`, dateModified: guide.lastReviewed })) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Compliance', url: '/compliance' }, { name: guide.title, url: `/compliance/${slug}` }])) }} />

      {/* HERO */}
      <section style={{ borderBottom: '1px solid var(--line-heavy)' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: 'clamp(40px,5vw,60px) var(--px) clamp(44px,5vw,64px)' }}>
          <RevealOnScroll>
            <div className="mono" style={{ fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--copper)', marginBottom: 'clamp(24px,3vw,32px)' }}>
              Compliance / {guide.jurisdiction === 'ksa' ? 'Saudi Arabia' : guide.jurisdiction === 'uae' ? 'UAE' : guide.jurisdiction}
            </div>
          </RevealOnScroll>
          <RevealOnScroll><h1 className="disp" style={{ fontSize: 'clamp(34px,5.2vw,72px)', lineHeight: 1, margin: 0, maxWidth: '20ch' }}>{guide.title}</h1></RevealOnScroll>
          <RevealOnScroll delay={1}><p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(17px,1.9vw,21px)', lineHeight: 1.6, color: 'var(--forest)', margin: 'clamp(24px,3vw,34px) 0 0', maxWidth: '62ch' }}>{guide.intro}</p></RevealOnScroll>
          <RevealOnScroll delay={1}>
            <div className="mono" style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginTop: 'clamp(26px,3vw,34px)', fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--muted-nav)' }}>
              {guide.lastReviewed && <span>Reviewed &middot; {guide.lastReviewed}</span>}
              {guide.lastReviewed && guide.sources && <span style={{ color: 'var(--line)' }}>|</span>}
              {guide.sources && <span>{guide.sources}</span>}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <main style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: 'clamp(44px,5vw,68px) var(--px) clamp(56px,7vw,96px)' }}>
        <ArticleLayout
          main={
            <div>
              {/* Dynamic Portable Text Body */}
              <RevealOnScroll>
                <PortableTextRenderer value={guide.body} />
              </RevealOnScroll>

              <RevealOnScroll style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 40 }}>
                <Link href="/directory" className="btn-ink">Find licensed providers</Link>
                <Link href="/calculator" className="btn-line">What&rsquo;s your waste worth?</Link>
              </RevealOnScroll>

              {guide.sources && (
                <RevealOnScroll><SourceNote>Sources: {guide.sources}. Confirm current regulations before relying on them.</SourceNote></RevealOnScroll>
              )}
            </div>
          }
          aside={<TableOfContents items={toc} related={FALLBACK_RELATED} />}
        />
      </main>

      <Footer />
    </div>
  )
}
