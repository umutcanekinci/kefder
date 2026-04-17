import {defineField, defineType} from 'sanity'
import {FolderIcon} from '@sanity/icons'

export const documentType = defineType({
  name: 'kefderDocument',
  title: 'Dosya/Rapor',
  type: 'document',
  icon: FolderIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Dosya Adı',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'file',
      title: 'Dosya (PDF vb.)',
      type: 'file',
      options: {
        accept: '.pdf,.doc,.docx',
      },
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          {title: 'Faaliyet Raporu', value: 'faaliyetRaporu'},
          {title: 'Tüzük', value: 'tuzuk'},
          {title: 'Diğer', value: 'diger'},
        ],
        layout: 'dropdown'
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
})
