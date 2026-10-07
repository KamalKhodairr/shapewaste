import { defineField, defineType } from 'sanity'

export const complianceGuide = defineType({
  name: 'complianceGuide',
  title: 'Compliance Guide',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 80 }, validation: Rule => Rule.required() }),
    defineField({ name: 'jurisdiction', title: 'Jurisdiction', type: 'string', options: { list: [{ title: 'Saudi Arabia (KSA)', value: 'ksa' }, { title: 'UAE', value: 'uae' }, { title: 'Gulf-wide', value: 'gulf' }] }, validation: Rule => Rule.required() }),
    defineField({ name: 'metaTitle', title: 'SEO Title', type: 'string' }),
    defineField({ name: 'metaDescription', title: 'SEO Description', type: 'text', rows: 3 }),
    defineField({ name: 'lastReviewed', title: 'Last Reviewed', type: 'date' }),
    defineField({ name: 'intro', title: 'Intro paragraph (answer-first)', type: 'text', rows: 4, description: 'Self-contained GEO answer — 50-90 words, extractable by AI.' }),
    defineField({
      name: 'body', title: 'Body', type: 'array',
      of: [
        { type: 'block', styles: [{ title: 'Normal', value: 'normal' }, { title: 'H2', value: 'h2' }, { title: 'H3', value: 'h3' }], marks: { decorators: [{ title: 'Strong', value: 'strong' }, { title: 'Italic', value: 'em' }], annotations: [{ name: 'link', type: 'object', fields: [{ name: 'href', type: 'url', title: 'URL' }, { name: 'internal', type: 'boolean', title: 'Internal link?' }] }] } },
        { type: 'object', name: 'petrolPanel', title: 'Petrol Panel (stat)', fields: [{ name: 'label', type: 'string', title: 'Label (above figure)' }, { name: 'figure', type: 'string', title: 'Figure (e.g. SAR 30M)' }, { name: 'sublabel', type: 'string', title: 'Sub-label (below figure)' }] },
        { type: 'object', name: 'obligationList', title: 'Obligation List', fields: [{ name: 'items', type: 'array', title: 'Items', of: [{ type: 'object', fields: [{ name: 'heading', type: 'string', title: 'Bold heading' }, { name: 'detail', type: 'text', title: 'Detail text' }] }] }] },
        { type: 'object', name: 'calloutBlock', title: 'Callout / Risk Note', fields: [{ name: 'text', type: 'text', title: 'Text' }, { name: 'linkLabel', type: 'string', title: 'Link label' }, { name: 'linkHref', type: 'string', title: 'Link href' }] },
      ],
    }),
    defineField({ name: 'sources', title: 'Sources', type: 'text', rows: 3 }),
    defineField({ name: 'toc', title: 'Table of Contents', type: 'array', of: [{ type: 'object', fields: [{ name: 'label', type: 'string', title: 'Label' }, { name: 'anchor', type: 'string', title: 'Anchor ID' }] }] }),
  ],
  preview: { select: { title: 'title', subtitle: 'jurisdiction' } },
})
