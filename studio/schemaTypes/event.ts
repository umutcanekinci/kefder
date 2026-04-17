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
      name: 'eventDate',
      title: 'Etkinlik Tarihi ve Saati',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Yer / Mekan',
      type: 'string',
    }),
    defineField({
      name: 'mainImage',
      title: 'Etkinlik Afişi/Görseli',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      title: 'Etkinlik Detayları',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'isUpcoming',
      title: 'Yaklaşan Etkinlik Mi?',
      type: 'boolean',
      initialValue: true,
      description: 'Geçmiş etkinlik mi yoksa yaklaşan etkinlik mi olduğunu belirlemek için işaretleyin.',
    }),
  ],
})
