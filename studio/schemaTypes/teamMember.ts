import {defineField, defineType} from 'sanity'
import {UsersIcon} from '@sanity/icons'

export const teamMemberType = defineType({
  name: 'teamMember',
  title: 'Ekip Üyesi',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'İsim Soyisim',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Görevi',
      type: 'localeString',
    }),
    defineField({
      name: 'profession',
      title: 'Mesleği',
      type: 'localeString',
    }),
    defineField({
      name: 'image',
      title: 'Profil Fotoğrafı',
      type: 'image',
      options: {
        hotspot: true,
      },
      initialValue: {
        asset: {
          _type: 'reference',
          _ref: 'image-6796b22dd8ba017157074cc607d95144bc24d1cf-1024x1024-jpg'
        }
      }
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role.tr',
      media: 'image',
    },
  },
})
