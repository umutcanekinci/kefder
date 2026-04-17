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
      type: 'string',
      description: 'Örn: Yönetim Kurulu Başkanı',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Profil Fotoğrafı',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
