import {eventType} from './event'
import {newsType} from './news'
import {teamMemberType} from './teamMember'
import {documentType} from './document'
import {siteSettingsType} from './siteSettings'
import {aboutType} from './about'
import {localeString} from './localeString'
import {localeBlock} from './localeBlock'

import {documentArchiveType} from './documentArchive'

import {activityType} from './activity'

export const schemaTypes = [
  eventType,
  newsType,
  teamMemberType,
  documentType,
  documentArchiveType,
  activityType,
  siteSettingsType,
  aboutType,
  localeString,
  localeBlock,
]
