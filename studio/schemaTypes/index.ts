import {eventType} from './event'
import {newsType} from './news'
import {teamMemberType} from './teamMember'
import {documentType} from './document'
import {siteSettingsType} from './siteSettings'
import {aboutType} from './about'
import {localeString} from './localeString'
import {localeBlock} from './localeBlock'

import {documentArchiveType} from './documentArchive'
import {memoryGalleryType} from './memoryGallery'

import {activityType} from './activity'
import {pressType} from './press'

export const schemaTypes = [
  eventType,
  newsType,
  pressType,
  teamMemberType,
  documentType,
  documentArchiveType,
  activityType,
  memoryGalleryType,
  siteSettingsType,
  aboutType,
  localeString,
  localeBlock,
]
