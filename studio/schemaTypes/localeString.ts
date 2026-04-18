import {defineField, defineType} from 'sanity'

export const localeString = defineType({
  title: 'Çok Dilli Metin',
  name: 'localeString',
  type: 'object',
  fields: [
    defineField({
      title: 'Türkçe',
      name: 'tr',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'English',
      name: 'en',
      type: 'string',
    }),
  ],
})
