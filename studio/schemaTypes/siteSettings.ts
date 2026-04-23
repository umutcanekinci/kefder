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
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  {title: 'Facebook', value: 'facebook'},
                  {title: 'Instagram', value: 'instagram'},
                  {title: 'Youtube', value: 'youtube'},
                  {title: 'Twitter (X)', value: 'twitter'},
                  {title: 'LinkedIn', value: 'linkedin'},
                ],
              },
            }),
            defineField({name: 'url', title: 'URL', type: 'url'}),
            defineField({name: 'label', title: 'Etiket (Opsiyonel, Örn: AECC)', type: 'string'}),
          ],
          preview: {
            select: {
              platform: 'platform',
              label: 'label',
            },
            prepare({platform, label}) {
              return {
                title: platform ? platform.charAt(0).toUpperCase() + platform.slice(1) : 'Adsız',
                subtitle: label || '',
              }
            },
          },
        },
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
