import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import ArticleLayout from '@/components/article/ArticleLayout'
import TableOfContents from '@/components/article/TableOfContents'
import NextCard from '@/components/answers/NextCard'
import Link from 'next/link'
import { buildMetadata, faqSchema } from '@/lib/seo'
import { getAnswerPage } from '@/lib/queries'

export const metadata = buildMetadata({
  title: 'Gulf waste compliance, answered',
  description: 'Short, sourced answers to the compliance questions Gulf business managers actually ask — EPR, UAE Federal Law 12, Saudi waste law, penalties, and contractor liability.',
  path: '/answers',
})

const FALLBACK_QAS = [
  {
    id: 'epr-uae',
    q: 'Does my business have to comply with EPR in the UAE?',
    a: 'Likely yes, if you place packaging, electrical or electronic equipment, or batteries on the UAE market as a producer, importer, or brand owner. The UAE has piloted Extended Producer Responsibility across these three streams, with a national framework maturing. Even before it\u2019s mandatory, affected businesses should map their materials and model the coming fees.',
    sourcing: 'Confirm the current framework status before treating any obligation as fixed. Read the full EPR guide. Sources: MOCCAE / Tadweer Group; Federal Law 12 of 2018, Article 5.',
    link: '/compliance/epr',
    linkLabel: 'Full EPR guide',
  },
  {
    id: 'epr-when',
    q: 'When does UAE EPR become mandatory, and what does it cover?',
    a: 'The UAE\u2019s EPR pilot covered packaging, electrical and electronic equipment, and batteries, and was designed to inform a full national framework anticipated to follow. Confirm the current legal status before treating any date as fixed. Scope is clear: packaging, electronics, and batteries are the first three regulated streams.',
    sourcing: 'The framework is anticipated but still maturing \u2014 re-verify at publish. Sources: MOCCAE / Tadweer Group EPR pilot.',
    link: '/compliance/epr',
    linkLabel: 'Full EPR guide',
  },
  {
    id: 'fl12',
    q: 'What is UAE Federal Law 12 of 2018?',
    a: 'It\u2019s the UAE\u2019s federal Integrated Waste Management law \u2014 the national backbone for how waste is managed, with executive regulations in Cabinet Decision 39 of 2021 and oversight by the Ministry of Climate Change and Environment. Article 5 makes producers and suppliers responsible for post-use products and their costs. Emirate authorities administer permits on top.',
    sourcing: 'Sources: Federal Law 12 of 2018; Cabinet Decision 39 of 2021; MOCCAE.',
    link: '/compliance/uae',
    linkLabel: 'Full guide to Federal Law 12 of 2018',
  },
  {
    id: 'ksa-reg',
    q: 'Who regulates waste management in Saudi Arabia?',
    a: 'The National Center for Waste Management (MWAN), established in 2019, is the primary regulator. It issues activity-specific licences, sets standards per waste category, and imposes penalties. The Ministry of Environment, Water & Agriculture (MEWA) governs the wider environmental framework.',
    sourcing: 'Sources: MWAN; MEWA; trade.gov Country Commercial Guide.',
    link: '/compliance/ksa',
    linkLabel: 'Full Saudi guide',
  },
  {
    id: 'ksa-pen',
    q: 'What are the penalties for improper waste disposal in Saudi Arabia?',
    a: 'Serious violations \u2014 dumping, burning, or disposing of waste in ways that threaten health or the environment \u2014 can bring up to 10 years\u2019 imprisonment and fines up to SAR 30 million (about USD 8 million) under Article 29 of the 2021 Waste Management Law. Daily continuation fines and doubled penalties for repeat offences also apply.',
    sourcing: 'Confirm current figures before relying on them. Sources: Waste Management Law (2021), Articles 29 / 31.',
    link: '/compliance/ksa',
    linkLabel: 'Full Saudi guide',
    panel: { col1Label: 'Max fine \u00b7 Art. 29', col1Figure: 'SAR 30M', col2Label: 'Imprisonment', col2Figure: 'Up to 10 yrs' },
  },
  {
    id: 'liable',
    q: 'Am I liable if my waste contractor dumps illegally in Saudi Arabia?',
    a: 'Yes. Under the 2021 Waste Management Law, a business that hands waste to an unlicensed contractor is jointly and severally liable for any resulting environmental damage \u2014 alongside the contractor. Using a MWAN-licensed provider is the only way to limit this exposure.',
    sourcing: 'Sources: Saudi Waste Management Law (2021); zerowaste.com.sa.',
    link: '/directory',
    linkLabel: 'Find licensed providers',
  },
  {
    id: 'segregation',
    q: 'Is waste segregation mandatory for businesses in the Gulf?',
    a: 'In Saudi Arabia, segregating waste at the point of generation is required, and mixing hazardous with non-hazardous waste is itself a violation. In the UAE, segregation obligations are set federally and by emirate. Requirements vary by activity and location \u2014 confirm your specific rules.',
    sourcing: 'Requirements vary by activity and location.',
    link: '/compliance/ksa',
    linkLabel: 'Saudi guide',
  },
  {
    id: 'permit',
    q: 'Do I need a waste permit to operate in Dubai or Abu Dhabi?',
    a: 'Permits are administered at the emirate level. In Abu Dhabi, Tadweer Group handles waste-service licensing; Dubai administers its own permits and Tadweer is not the Dubai licensor; some free zones (e.g. Trakhees jurisdictions) run their own approved-provider lists. Confirm the authority for your activity and location.',
    sourcing: 'Sources: MOCCAE; Tadweer Group; EAD; businessdubai.ae. Verify per site.',
    link: '/compliance/uae',
    linkLabel: 'Full UAE guide',
  },
]

export default async function AnswersPage() {
  const pageData = await getAnswerPage().catch(() => null)
  const qasRaw = pageData?.qas || FALLBACK_QAS
  const qas = qasRaw.map((q: any) => ({
    id: q.id || q._id,
    q: q.q || q.question,
    a: q.a || q.answer,
    sourcing: q.sourcing,
    link: q.link,
    linkLabel: q.linkLabel,
    panel: q.panel,
  }))

  const TOC = qas.map((q: any) => ({ label: q.q.split(' ').slice(0, 5).join(' ') + '\u2026', anchor: q.id }))
  const faqData = qas.map((q: any) => ({ question: q.q, answer: q.a }))

  return (
    <div style={{ background: 'var(--mineral)', minHeight: '100vh' }}>
      <Header activePath="/answers" />

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqData)) }} />

      {/* HERO */}
      <section style={{ borderBottom: '1px solid var(--line-heavy)' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: 'clamp(44px,5vw,64px) var(--px) clamp(44px,5vw,60px)' }}>
          <RevealOnScroll>
            <div className="mono" style={{ fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--copper)', marginBottom: 'clamp(22px,2.6vw,28px)' }}>{pageData?.badge || 'Compliance / Answers'}</div>
          </RevealOnScroll>
          <RevealOnScroll>
            <h1 className="disp" style={{ fontSize: 'clamp(36px,5.4vw,76px)', lineHeight: 1, margin: 0, maxWidth: '18ch' }}>
              Gulf waste compliance, <span style={{ fontStyle: 'italic', color: 'var(--brass)' }}>answered.</span>
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={1}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(17px,1.8vw,21px)', lineHeight: 1.58, color: 'var(--forest)', margin: 'clamp(24px,3vw,32px) 0 0', maxWidth: '58ch' }}>
              Short, sourced answers to the questions managers actually ask. Each opens with a self-contained answer; expand for scope and sourcing.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <main style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: 'clamp(36px,4.5vw,60px) var(--px) clamp(56px,7vw,96px)' }}>
        <ArticleLayout
          main={
            <div style={{ borderTop: '1px solid var(--line-heavy)' }}>
              <style>{`
                .qa a{text-decoration:underline;text-underline-offset:2px;text-decoration-color:var(--line);}
                .qa a:hover{text-decoration-color:var(--ink);}
              `}</style>
              {qas.map((qa: any) => (
                <RevealOnScroll
                  key={qa.id}
                  style={{ padding: 'clamp(26px,3vw,34px) 0', borderBottom: '1px solid var(--line)', scrollMarginTop: 32 }}
                >
                  <div id={qa.id}>
                    <h2 className="disp" style={{ fontSize: 'clamp(21px,2.3vw,28px)', lineHeight: 1.1, margin: '0 0 16px' }}>{qa.q}</h2>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: 17.5, lineHeight: 1.72, color: 'var(--forest)', margin: 0, maxWidth: '68ch' }}>{qa.a}</p>

                    {/* Optional petrol stat panel */}
                    {qa.panel && (
                      <div style={{ display: 'inline-flex', flexWrap: 'wrap', background: 'var(--petrol)', marginTop: 18 }}>
                        <div style={{ padding: '16px 24px' }}>
                          <div className="mono" style={{ fontSize: 10.5, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--muted-dark)', marginBottom: 6 }}>{qa.panel.col1Label}</div>
                          <div className="disp" style={{ fontSize: 'clamp(24px,3vw,32px)', color: 'var(--gold)', lineHeight: .95 }}>{qa.panel.col1Figure}</div>
                        </div>
                        <div style={{ width: 1, background: 'var(--line-petrol)' }} />
                        <div style={{ padding: '16px 24px' }}>
                          <div className="mono" style={{ fontSize: 10.5, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--muted-dark)', marginBottom: 6 }}>{qa.panel.col2Label}</div>
                          <div className="disp" style={{ fontSize: 'clamp(24px,3vw,32px)', color: 'var(--gold)', lineHeight: .95 }}>{qa.panel.col2Figure}</div>
                        </div>
                      </div>
                    )}

                    <details style={{ marginTop: 16 }}>
                      <summary className="mono" style={{ fontSize: 11.5, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--copper)', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                        <span className="caret">&rsaquo;</span>Scope &amp; sourcing
                      </summary>
                      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--muted-nav)', lineHeight: 1.65, margin: '12px 0 0', maxWidth: '66ch' }}>
                        {qa.sourcing}{' '}
                        <Link href={qa.link} className="qa">{qa.linkLabel}</Link>.
                      </p>
                    </details>
                  </div>
                </RevealOnScroll>
              ))}
              <NextCard />
            </div>
          }
          aside={
            <TableOfContents
              items={TOC}
              related={[
                { label: 'Compliance guides', href: '/compliance' },
                { label: 'Find licensed providers', href: '/directory' },
              ]}
            />
          }
        />
      </main>

      <Footer />
    </div>
  )
}
