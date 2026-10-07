import { defineField, defineType } from 'sanity'

export const provider = defineType({
  name: 'provider',
  title: 'Directory Provider',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Company name', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'region', title: 'City / Region', type: 'string', options: { list: ['Riyadh', 'Jeddah', 'Dammam', 'Dubai', 'Abu Dhabi', 'Sharjah'] }, validation: Rule => Rule.required() }),
    defineField({ name: 'country', title: 'Country', type: 'string', options: { list: [{ title: 'Saudi Arabia', value: 'ksa' }, { title: 'UAE', value: 'uae' }] } }),
    defineField({ name: 'materials', title: 'Material streams', type: 'array', of: [{ type: 'string' }], options: { list: ['Plastics', 'Paper & board', 'Metals', 'E-waste', 'Organics', 'C&D'] } }),
    defineField({ name: 'licensed', title: 'Licensed?', type: 'boolean', initialValue: false }),
    defineField({ name: 'licenceBody', title: 'Licensing body', type: 'string' }),
    defineField({ name: 'notes', title: 'Notes (internal)', type: 'text', rows: 2 }),
    defineField({ name: 'active', title: 'Show in directory?', type: 'boolean', initialValue: true }),
  ],
  preview: { select: { title: 'name', subtitle: 'region' } },
})
