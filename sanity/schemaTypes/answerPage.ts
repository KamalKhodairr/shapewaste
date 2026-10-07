import { defineField, defineType } from 'sanity'

export const answerPage = defineType({
  name: 'answerPage',
  title: 'Answer Page / FAQ',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Page title', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'metaTitle', title: 'SEO Title', type: 'string' }),
    defineField({ name: 'metaDescription', title: 'SEO Description', type: 'text', rows: 3 }),
    defineField({
      name: 'questions', title: 'Questions', type: 'array',
      of: [{ type: 'object', name: 'question', fields: [
        { name: 'id', type: 'string', title: 'Anchor ID (e.g. epr-uae)' },
        { name: 'question', type: 'string', title: 'Question text' },
        { name: 'answer', type: 'text', title: 'Answer (50-90 words)', rows: 5 },
        { name: 'sourcingNote', type: 'text', title: 'Scope & sourcing note', rows: 3 },
        { name: 'relatedGuideSlug', type: 'string', title: 'Related guide slug' },
        { name: 'petrolPanel', type: 'object', title: 'Optional stat panel', fields: [{ name: 'col1Label', type: 'string', title: 'Col 1 label' }, { name: 'col1Figure', type: 'string', title: 'Col 1 figure' }, { name: 'col2Label', type: 'string', title: 'Col 2 label' }, { name: 'col2Figure', type: 'string', title: 'Col 2 figure' }] },
      ], preview: { select: { title: 'question' } } }],
    }),
  ],
})
