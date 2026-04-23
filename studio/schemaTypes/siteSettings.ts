import {defineField, defineType} from 'sanity'
import {CogIcon} from '@sanity/icons'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Genel Ayarlar',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Site Başlığı (SEO)',
      type: 'localeString',
    }),
    defineField({
      name: 'isMaintenanceMode',
      title: 'Bakım Modu',
      type: 'boolean',
      description: 'Site bakımda mı değil mi?',
      initialValue: false,
    }),
    defineField({
      name: 'socialLinks',
      title: 'Sosyal Medya Linkleri',
      type: 'object',
      fields: [
        defineField({name: 'facebook', title: 'Facebook URL', type: 'url'}),
        defineField({name: 'instagram', title: 'Instagram URL', type: 'url'}),
        defineField({name: 'aeccFacebook', title: 'AECC Facebook URL', type: 'url'}),
      ],
    }),
    defineField({
      name: 'contactInfo',
      title: 'İletişim Bilgileri',
      type: 'object',
      fields: [
        defineField({name: 'email', title: 'E-posta Adresi', type: 'string'}),
        defineField({name: 'phone', title: 'Telefon Numarası', type: 'string'}),
        defineField({name: 'address', title: 'Adres', type: 'text'}),
        defineField({
          name: 'workingHours',
          title: 'Çalışma Saatleri',
          type: 'localeString',
          description: 'Örn: Pazartesi - Cuma: 09:00 - 18:00',
        }),
        defineField({
          name: 'googleMapsUrl',
          title: 'Google Maps Paylaşım Linki (Embed)',
          type: 'string',
          description: 'Google Haritalar -> Paylaş -> Harita Yerleştir kısmındaki iframe src adresini buraya yapıştırın.',
        }),
      ],
    }),
    defineField({
      name: 'logo',
      title: 'Site Logosu',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'title.tr',
      subtitle: 'description.tr',
    },
  },
})
