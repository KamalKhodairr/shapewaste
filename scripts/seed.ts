import { createClient } from '@sanity/client'

// Initialize the Sanity client
// You must provide a token with WRITE access to run this script.
// Set it in your environment: $env:SANITY_API_TOKEN="your_token"
const client = createClient({
  projectId: 'fau67aok',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
})

const PROVIDERS = [
  { _type: 'provider', name: 'Gulf Resource Recovery',     region: 'Riyadh',    country: 'ksa', materials: ['Plastics', 'Metals', 'E-waste'],              licensed: true,  licenceBody: 'MWAN' },
  { _type: 'provider', name: 'Najd Materials Reclamation', region: 'Riyadh',    country: 'ksa', materials: ['Paper & board', 'Plastics'],                   licensed: true,  licenceBody: 'MWAN' },
  { _type: 'provider', name: 'Red Sea Circular Co.',       region: 'Jeddah',    country: 'ksa', materials: ['Organics', 'Paper & board'],                   licensed: true,  licenceBody: 'MWAN' },
  { _type: 'provider', name: 'Tihama Waste Partners',      region: 'Jeddah',    country: 'ksa', materials: ['C&D', 'Metals'],                               licensed: false },
  { _type: 'provider', name: 'Eastern Province Recyclers', region: 'Dammam',    country: 'ksa', materials: ['Metals', 'E-waste'],                           licensed: true,  licenceBody: 'MWAN' },
  { _type: 'provider', name: 'Dhahran Stream Services',    region: 'Dammam',    country: 'ksa', materials: ['Plastics', 'Organics'],                        licensed: true,  licenceBody: 'MWAN' },
  { _type: 'provider', name: 'Emirates Circular Co.',      region: 'Dubai',     country: 'uae', materials: ['Organics', 'C&D', 'Paper & board'],            licensed: true,  licenceBody: 'Dubai Municipality' },
  { _type: 'provider', name: 'Marina Reclaim',             region: 'Dubai',     country: 'uae', materials: ['Plastics', 'E-waste'],                         licensed: true,  licenceBody: 'Dubai Municipality' },
  { _type: 'provider', name: 'Capital Waste Solutions',    region: 'Abu Dhabi', country: 'uae', materials: ['C&D', 'Metals', 'Plastics'],                   licensed: true,  licenceBody: 'Tadweer' },
  { _type: 'provider', name: 'Yas Materials Group',        region: 'Abu Dhabi', country: 'uae', materials: ['E-waste', 'Paper & board'],                    licensed: false },
  { _type: 'provider', name: 'Sharjah Reclamation Works',  region: 'Sharjah',   country: 'uae', materials: ['Metals', 'C&D'],                               licensed: true,  licenceBody: "Bee'ah" },
  { _type: 'provider', name: 'Industrial Belt Recovery',   region: 'Sharjah',   country: 'uae', materials: ['Plastics', 'Organics', 'Paper & board'],       licensed: true,  licenceBody: "Bee'ah" },
]

const QAS = [
  { _key: 'q1', id: 'epr-uae', question: 'Does my business have to comply with EPR in the UAE?', answer: 'Likely yes, if you place packaging, electrical or electronic equipment, or batteries on the UAE market as a producer, importer, or brand owner. The UAE has piloted Extended Producer Responsibility across these three streams, with a national framework maturing. Even before it’s mandatory, affected businesses should map their materials and model the coming fees.', sourcingNote: 'Confirm the current framework status before treating any obligation as fixed. Read the full EPR guide. Sources: MOCCAE / Tadweer Group; Federal Law 12 of 2018, Article 5.', relatedGuideSlug: 'epr' },
  { _key: 'q2', id: 'epr-when', question: 'When does UAE EPR become mandatory, and what does it cover?', answer: 'The UAE’s EPR pilot covered packaging, electrical and electronic equipment, and batteries, and was designed to inform a full national framework anticipated to follow. Confirm the current legal status before treating any date as fixed. Scope is clear: packaging, electronics, and batteries are the first three regulated streams.', sourcingNote: 'The framework is anticipated but still maturing — re-verify at publish. Sources: MOCCAE / Tadweer Group EPR pilot.', relatedGuideSlug: 'epr' },
  { _key: 'q3', id: 'fl12', question: 'What is UAE Federal Law 12 of 2018?', answer: 'It’s the UAE’s federal Integrated Waste Management law — the national backbone for how waste is managed, with executive regulations in Cabinet Decision 39 of 2021 and oversight by the Ministry of Climate Change and Environment. Article 5 makes producers and suppliers responsible for post-use products and their costs. Emirate authorities administer permits on top.', sourcingNote: 'Sources: Federal Law 12 of 2018; Cabinet Decision 39 of 2021; MOCCAE.', relatedGuideSlug: 'uae' },
  { _key: 'q4', id: 'ksa-reg', question: 'Who regulates waste management in Saudi Arabia?', answer: 'The National Center for Waste Management (MWAN), established in 2019, is the primary regulator. It issues activity-specific licences, sets standards per waste category, and imposes penalties. The Ministry of Environment, Water & Agriculture (MEWA) governs the wider environmental framework.', sourcingNote: 'Sources: MWAN; MEWA; trade.gov Country Commercial Guide.', relatedGuideSlug: 'ksa' },
  { _key: 'q5', id: 'ksa-pen', question: 'What are the penalties for improper waste disposal in Saudi Arabia?', answer: 'Serious violations — dumping, burning, or disposing of waste in ways that threaten health or the environment — can bring up to 10 years’ imprisonment and fines up to SAR 30 million (about USD 8 million) under Article 29 of the 2021 Waste Management Law. Daily continuation fines and doubled penalties for repeat offences also apply.', sourcingNote: 'Confirm current figures before relying on them. Sources: Waste Management Law (2021), Articles 29 / 31.', relatedGuideSlug: 'ksa', petrolPanel: { col1Label: 'Max fine · Art. 29', col1Figure: 'SAR 30M', col2Label: 'Imprisonment', col2Figure: 'Up to 10 yrs' } },
  { _key: 'q6', id: 'liable', question: 'Am I liable if my waste contractor dumps illegally in Saudi Arabia?', answer: 'Yes. Under the 2021 Waste Management Law, a business that hands waste to an unlicensed contractor is jointly and severally liable for any resulting environmental damage — alongside the contractor. Using a MWAN-licensed provider is the only way to limit this exposure.', sourcingNote: 'Sources: Saudi Waste Management Law (2021); zerowaste.com.sa.', relatedGuideSlug: '' },
  { _key: 'q7', id: 'segregation', question: 'Is waste segregation mandatory for businesses in the Gulf?', answer: 'In Saudi Arabia, segregating waste at the point of generation is required, and mixing hazardous with non-hazardous waste is itself a violation. In the UAE, segregation obligations are set federally and by emirate. Requirements vary by activity and location — confirm your specific rules.', sourcingNote: 'Requirements vary by activity and location.', relatedGuideSlug: 'ksa' },
  { _key: 'q8', id: 'permit', question: 'Do I need a waste permit to operate in Dubai or Abu Dhabi?', answer: 'Permits are administered at the emirate level. In Abu Dhabi, Tadweer Group handles waste-service licensing; Dubai administers its own permits and Tadweer is not the Dubai licensor; some free zones (e.g. Trakhees jurisdictions) run their own approved-provider lists. Confirm the authority for your activity and location.', sourcingNote: 'Sources: MOCCAE; Tadweer Group; EAD; businessdubai.ae. Verify per site.', relatedGuideSlug: 'uae' },
]

const ANSWER_PAGE = {
  _type: 'answerPage',
  _id: 'answerPageSingleton',
  title: 'Answers',
  slug: { _type: 'slug', current: 'answers' },
  metaTitle: 'Gulf waste compliance, answered',
  metaDescription: 'Short, sourced answers to the compliance questions Gulf business managers actually ask — EPR, UAE Federal Law 12, Saudi waste law, penalties, and contractor liability.',
  questions: QAS,
}

const KSA_GUIDE = {
  _type: 'complianceGuide',
  title: 'Saudi Arabia’s Waste Management Law',
  slug: { _type: 'slug', current: 'ksa' },
  jurisdiction: 'ksa',
  metaTitle: 'Saudi Waste Management Law (2021): What Businesses Must Know',
  metaDescription: 'The 2021 Waste Management Law made every Saudi business a regulated waste producer. Your obligations, MWAN licensing, and the real penalties.',
  lastReviewed: '2026-08-01',
  intro: 'Since November 2021, every business in Saudi Arabia that produces waste — which is all of them — has been a regulated waste producer with legal obligations. Non-compliance carries some of the heaviest environmental penalties in the region, and liability can reach you even when a contractor does the damage.',
  sources: '2021 Waste Management Law · MWAN · MEWA',
  toc: [
    { _key: 't1', label: 'The law, in brief', anchor: 'brief' },
    { _key: 't2', label: 'Who enforces it', anchor: 'enforces' },
    { _key: 't3', label: 'Your core obligations', anchor: 'obligations' },
    { _key: 't4', label: 'Penalties & liability', anchor: 'penalties' },
  ],
  body: [
    { _key: 'b1', _type: 'block', style: 'h2', children: [{ _type: 'span', text: 'The law, in brief', marks: [] }] },
    { _key: 'b2', _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'The Waste Management Law was issued by Royal Decree on 13 August 2021 and came into force on 14 November 2021. It runs to 38 articles, replaced the 2013 Municipal Solid Waste Management Law, and governs the entire waste lifecycle — collection, transport, sorting, storage, treatment, recycling, import, export, and disposal, plus civil and criminal liability. It applies to businesses in every sector.', marks: [] }] },
    { _key: 'b3', _type: 'block', style: 'h2', children: [{ _type: 'span', text: 'Who enforces it', marks: [] }] },
    { _key: 'b4', _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'The National Center for Waste Management (MWAN), established in 2019 and headquartered in Riyadh, is the primary regulator. It issues licences and permits, sets standards per waste category, imposes fines and administrative penalties, and oversees the circular-economy principle. The Ministry of Environment, Water & Agriculture (MEWA) governs the broader environmental framework.', marks: [] }] },
    { _key: 'b5', _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Critically, MWAN licences are activity-specific: a contractor licensed to transport waste is not thereby licensed to treat or dispose of it. No waste-management activity may be conducted without the relevant MWAN authorisation.', marks: [] }] },
    { _key: 'b6', _type: 'block', style: 'h2', children: [{ _type: 'span', text: 'Your core obligations', marks: [] }] },
    {
      _key: 'b7',
      _type: 'obligationList',
      items: [
        { _key: 'i1', heading: 'Segregate at the point of generation.', detail: 'Mixing hazardous and non-hazardous streams is itself a violation.' },
        { _key: 'i2', heading: 'Store waste only in approved locations', detail: 'meeting MWAN’s environmental controls.' },
        { _key: 'i3', heading: 'Use only MWAN-licensed providers', detail: 'for transport, treatment, and disposal.' },
        { _key: 'i4', heading: 'Keep accurate documentation', detail: '— manifests, transport records, and (for hazardous streams) characterisation reports.' },
      ]
    },
    { _key: 'b8', _type: 'block', style: 'h2', children: [{ _type: 'span', text: 'The penalties are real — and the liability follows you', marks: [] }] },
    { _key: 'b9', _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Under Article 29, storing, burning, treating, dumping, or disposing of waste in a way that threatens public health or the environment can bring up to 10 years’ imprisonment, a fine of up to SAR 30 million (roughly USD 8 million), or both. Courts can add daily continuation fines and can double fines for repeat offences within three years (Article 31). Other breaches can reach SAR 10 million and licence suspension of up to six months (Article 32).', marks: [] }] },
    { _key: 'b10', _type: 'petrolPanel', label: 'Maximum penalty · Article 29', figure: 'SAR 30M', sublabel: 'Up to 10 years’ imprisonment, or both.' },
    { _key: 'b11', _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'The provision that catches most businesses off guard: joint and several liability. If you hand your waste to an unlicensed contractor and they dump it illegally, you are legally responsible for the environmental damage alongside them. You cannot escape liability by pointing at the contractor.', marks: ['strong'] }] },
  ]
}

const UAE_GUIDE = {
  _type: 'complianceGuide',
  title: 'UAE Federal Law 12 of 2018',
  slug: { _type: 'slug', current: 'uae' },
  jurisdiction: 'uae',
  metaTitle: 'UAE Waste Law: Business Obligations Under Federal Law 12 of 2018',
  metaDescription: 'What UAE businesses must do under Federal Law 12 of 2018 — segregation, licensed disposal, producer duties, and how emirate-level rules add on top.',
  lastReviewed: '2026-08-01',
  intro: 'Waste in the UAE is governed by a federal law with an emirate-level layer on top — which is where most businesses get confused. This guide separates the two so you know which rules apply and who to answer to.',
  sources: 'Federal Law 12 of 2018 · Cabinet Decision 39 of 2021 · MOCCAE · Tadweer Group · EAD',
  toc: [
    { _key: 't1', label: 'The federal backbone', anchor: 'federal' },
    { _key: 't2', label: 'The emirate layer', anchor: 'emirates' },
    { _key: 't3', label: 'What this means for you', anchor: 'obligations' },
  ],
  body: [
    { _key: 'b1', _type: 'block', style: 'h2', children: [{ _type: 'span', text: 'The federal backbone', marks: [] }] },
    { _key: 'b2', _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Federal Law No. 12 of 2018 on Integrated Waste Management is the national framework, with executive regulations in Cabinet Decision No. 39 of 2021. It assigns responsibility across the chain — including, in Article 5, to producers and suppliers for post-use products and their costs. The federal regulator is the Ministry of Climate Change and Environment (MOCCAE).', marks: [] }] },
    { _key: 'b3', _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'The federal law sits inside a broader national direction: the UAE Circular Economy Policy 2021–2031, the Integrated Waste Management Agenda 2023–2026, and the Net Zero 2050 strategy. Abu Dhabi’s Tadweer Group targets diverting 80% of waste from landfill by 2030.', marks: [] }] },
    { _key: 'b4', _type: 'block', style: 'h2', children: [{ _type: 'span', text: 'The emirate layer', marks: [] }] },
    { _key: 'b5', _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Federal law sets the framework, but operating permits and day-to-day rules are administered at the emirate level. Abu Dhabi: Tadweer Group administers waste services and licensing; the Environment Agency – Abu Dhabi (EAD) is the environmental regulator. Dubai: administers its own permits — Tadweer is not your Dubai licensor. Some free-zone jurisdictions (e.g. Trakhees) publish their own approved-provider lists.', marks: [] }] },
    { _key: 'b6', _type: 'block', style: 'h2', children: [{ _type: 'span', text: 'What this means for your business', marks: [] }] },
    { _key: 'b7', _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Segregate at source where required, and store waste per approved standards. Use licensed providers for collection, transport, and disposal. Keep documentation of how your waste is handled. If you place packaging or electronics on the market, prepare for EPR.', marks: [] }] },
  ]
}

const EPR_GUIDE = {
  _type: 'complianceGuide',
  title: 'UAE Extended Producer Responsibility',
  slug: { _type: 'slug', current: 'epr' },
  jurisdiction: 'gulf', // Or uae depending on your enum
  metaTitle: 'UAE EPR Explained: What Producers & Importers Must Do',
  metaDescription: 'Extended Producer Responsibility is coming to the UAE for packaging, electronics, and batteries. Who it affects, what it will require, and how to prepare.',
  lastReviewed: '2026-08-01',
  intro: 'Extended Producer Responsibility (EPR) is the biggest change to the UAE’s waste rules in a generation, and it targets a group historically shielded from waste costs: the companies that put products and packaging on the market. If your business manufactures, imports, or brands packaged goods, electronics, or batteries in the UAE, EPR will land on your P&L.',
  sources: 'MOCCAE / Tadweer Group · Federal Law 12 of 2018 · Cabinet Decision 39 of 2021',
  toc: [
    { _key: 't1', label: 'What EPR actually means', anchor: 'what' },
    { _key: 't2', label: 'The legal basis in the UAE', anchor: 'legal' },
    { _key: 't3', label: 'Where it stands now', anchor: 'status' },
    { _key: 't4', label: 'Who is affected', anchor: 'who' },
    { _key: 't5', label: 'What to do now', anchor: 'action' },
  ],
  body: [
    { _key: 'b1', _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Content placeholder for EPR Guide.', marks: [] }] },
  ]
}

async function seed() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error('Error: SANITY_API_TOKEN is missing. Please set it to a Sanity API token with write access.')
    process.exit(1)
  }

  console.log('Seeding providers...')
  for (const provider of PROVIDERS) {
    await client.create(provider as any)
  }

  console.log('Seeding Answer Page...')
  await client.createOrReplace(ANSWER_PAGE)

  console.log('Seeding Compliance Guides...')
  await client.create(KSA_GUIDE)
  await client.create(UAE_GUIDE)
  await client.create(EPR_GUIDE)

  console.log('Done! All seed data has been imported to Sanity.')
}

seed().catch(console.error)
