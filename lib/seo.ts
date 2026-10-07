import type { Metadata } from 'next'

const SITE_URL = 'https://shapewaste.com'
const SITE_NAME = 'shapewaste'
const DEFAULT_DESCRIPTION = 'The commercial and compliance case for Gulf business waste — regulations, recoverable value, and licensed providers for Saudi Arabia and the UAE.'

export function buildMetadata({ title, description = DEFAULT_DESCRIPTION, path = '/', noIndex = false }: { title: string; description?: string; path?: string; noIndex?: boolean }): Metadata {
  const url = `${SITE_URL}${path}`
  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    openGraph: { title: `${title} | ${SITE_NAME}`, description, url, siteName: SITE_NAME, type: 'website', images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'shapewaste' }] },
    twitter: { card: 'summary_large_image', title, description },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  }
}

export function orgSchema() {
  return { '@context': 'https://schema.org', '@type': 'Organization', name: 'shapewaste', url: SITE_URL, description: DEFAULT_DESCRIPTION, areaServed: ['SA', 'AE'] }
}

export function articleSchema({ headline, description, url, dateModified }: { headline: string; description: string; url: string; dateModified?: string }) {
  return { '@context': 'https://schema.org', '@type': 'Article', headline, description, url: `https://shapewaste.com${url}`, publisher: { '@type': 'Organization', name: 'shapewaste', url: SITE_URL }, ...(dateModified ? { dateModified } : {}) }
}

export function faqSchema(questions: { question: string; answer: string }[]) {
  return { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: questions.map(q => ({ '@type': 'Question', name: q.question, acceptedAnswer: { '@type': 'Answer', text: q.answer } })) }
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.name, item: `https://shapewaste.com${item.url}` })) }
}
