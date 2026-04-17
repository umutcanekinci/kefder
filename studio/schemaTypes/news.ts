import {defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

export const newsType = defineType({
  name: 'news',
  title: 'Haber',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Haber Başlığı',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL (Slug)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Yayın Tarihi',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Haber Görseli',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'body',
      title: 'Haber İçeriği',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
})
