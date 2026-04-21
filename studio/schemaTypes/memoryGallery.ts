import {defineField, defineType} from 'sanity'
import {ImagesIcon} from '@sanity/icons'

export const memoryGalleryType = defineType({
  name: 'memoryGallery',
  title: 'Anı Galerisi',
  type: 'document',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Başlık',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Açıklama (İsteğe Bağlı)',
      type: 'localeString',
    }),
    defineField({
      name: 'date',
      title: 'Tarih',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
    }),
    defineField({
      name: 'coverImage',
      title: 'Kapak Fotoğrafı',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'images',
      title: 'Fotoğraflar',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'caption',
              title: 'Açıklama',
              type: 'string',
            }),
          ],
        },
      ],
      options: {
        layout: 'grid',
      },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'order',
      title: 'Sıralama',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title.tr',
      subtitle: 'date',
      media: 'coverImage',
    },
  },
})
