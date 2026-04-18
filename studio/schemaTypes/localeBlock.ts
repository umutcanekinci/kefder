import {defineField, defineType} from 'sanity'

export const localeBlock = defineType({
  title: 'Çok Dilli Zengin Metin',
  name: 'localeBlock',
  type: 'object',
  fields: [
    defineField({
      title: 'Türkçe',
      name: 'tr',
      type: 'array',
      of: [{type: 'block'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'English',
      name: 'en',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
})
