import {defineField, defineType} from 'sanity'
import {InfoOutlineIcon} from '@sanity/icons'

export const aboutType = defineType({
  name: 'about',
  title: 'Hakkımızda',
  type: 'document',
  icon: InfoOutlineIcon,
  fields: [
    defineField({
      name: 'description',
      title: 'Genel SEO Açıklaması',
      type: 'localeString',
    }),
    defineField({
      name: 'mission',
      title: 'Misyonumuz',
      type: 'localeString',
    }),
    defineField({
      name: 'vision',
      title: 'Vizyonumuz',
      type: 'localeString',
    }),
  ],
})
