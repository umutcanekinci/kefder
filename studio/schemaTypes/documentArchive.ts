import {defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

export const documentArchiveType = defineType({
  name: 'documentArchive',
  title: 'Dosya Arşivi',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Dosya Başlığı',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fileType',
      title: 'Dosya Tipi',
      type: 'string',
      options: {
        list: [
          {title: 'PDF', value: 'pdf'},
          {title: 'Word', value: 'doc'},
          {title: 'Excel', value: 'xls'},
          {title: 'Görsel', value: 'img'},
          {title: 'Diğer', value: 'other'},
        ],
      },
    }),
    defineField({
      name: 'file',
      title: 'Dosya',
      type: 'file',
      options: {
        accept: '.pdf,.doc,.docx,.xls,.xlsx,.png,.jpg',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishDate',
      title: 'Yayınlanma Tarihi',
      type: 'date',
    }),
  ],
  preview: {
    select: {
      title: 'title.tr',
      subtitle: 'fileType',
    },
  },
})
