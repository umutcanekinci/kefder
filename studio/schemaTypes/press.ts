import {defineField, defineType} from 'sanity'
import {MegaphoneIcon} from '@sanity/icons'

export const pressType = defineType({
  name: 'press',
  title: 'Basında Biz',
  type: 'document',
  icon: MegaphoneIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Haber Başlığı',
      type: 'localeString',
    }),
    defineField({
      name: 'sourceName',
      title: 'Kaynak Adı',
      type: 'string',
      description: 'Örn: Hürriyet, Milliyet, TRT Haber',
    }),
    defineField({
      name: 'sourceLogo',
      title: 'Kaynak Logosu',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'url',
      title: 'Haber Linki',
      type: 'url',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Yayın Tarihi',
      type: 'date',
    }),
  ],
  preview: {
    select: {
      title: 'title.tr',
      subtitle: 'sourceName',
      media: 'sourceLogo',
    },
  },
})
