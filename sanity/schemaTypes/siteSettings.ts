import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'brandName', title: 'Brand name', type: 'string', initialValue: 'shapewaste' }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string', initialValue: 'the commercial & compliance case for Gulf business waste.' }),
    defineField({ name: 'siteUrl', title: 'Site URL', type: 'url', initialValue: 'https://shapewaste.com' }),
    defineField({ name: 'ogDescription', title: 'Default OG description', type: 'text', rows: 2 }),
  ],
  preview: { prepare: () => ({ title: 'Site Settings' }) },
})
