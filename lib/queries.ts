import { client } from './sanity'

export async function getAllProviders() {
  return client.fetch(`*[_type == 'provider' && active == true] | order(region asc, name asc) { _id, name, region, country, materials, licensed, licenceBody }`)
}

export async function getAnswerPage() {
  return client.fetch(`*[_type == 'answerPage'][0] { title, questions[] { id, question, answer, sourcingNote, relatedGuideSlug, petrolPanel } }`)
}

export async function getAllComplianceGuides() {
  return client.fetch(`*[_type == 'complianceGuide'] | order(jurisdiction asc) { _id, title, slug, jurisdiction, metaTitle, metaDescription, lastReviewed, intro }`)
}

export async function getComplianceGuide(slug: string) {
  return client.fetch(`*[_type == 'complianceGuide' && slug.current == $slug][0] { title, slug, jurisdiction, metaTitle, metaDescription, lastReviewed, intro, body, sources, toc }`, { slug })
}
