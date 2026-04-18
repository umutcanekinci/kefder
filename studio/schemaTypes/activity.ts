import {defineField, defineType} from 'sanity'
import {ActivityIcon} from '@sanity/icons'

export const activityType = defineType({
  name: 'activity',
  title: 'Faaliyet Alanı',
  type: 'document',
  icon: ActivityIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Başlık',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Kısa Açıklama',
      type: 'localeString',
    }),
    defineField({
      name: 'category',
      title: 'Kategori Etiketi',
      type: 'string',
    }),
    defineField({
      name: 'icon',
      title: 'İkon Adı (Lucide)',
      type: 'string',
      description: 'Örn: GraduationCap, Palette, Music, Landmark, Heart, Globe',
    }),
    defineField({
      name: 'image',
      title: 'Görsel',
      type: 'image',
      options: {hotspot: true},
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
      subtitle: 'category',
      media: 'image',
    },
  },
})
