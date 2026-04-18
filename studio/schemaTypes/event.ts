import {defineField, defineType} from 'sanity'
import {CalendarIcon} from '@sanity/icons'

export const eventType = defineType({
  name: 'event',
  title: 'Etkinlik',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Etkinlik Başlığı',
      type: 'localeString',
    }),
    defineField({
      name: 'slug',
      title: 'URL (Slug)',
      type: 'slug',
      options: {
        source: 'title.tr',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'eventDate',
      title: 'Etkinlik Tarihi ve Saati',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Yer / Mekan',
      type: 'localeString',
    }),
    defineField({
      name: 'eventPoster',
      title: 'Etkinlik Afişi',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'content',
      title: 'Etkinlik İçeriği (Detaylı)',
      type: 'localeBlock',
    }),
    defineField({
      name: 'isUpcoming',
      title: 'Yaklaşan Etkinlik Mi?',
      type: 'boolean',
      initialValue: true,
      description: 'Geçmiş etkinlik mi yoksa yaklaşan etkinlik mi olduğunu belirlemek için işaretleyin.',
    }),
  ],
  preview: {
    select: {
      title: 'title.tr',
      subtitle: 'eventDate',
      media: 'eventPoster',
    },
  },
})
