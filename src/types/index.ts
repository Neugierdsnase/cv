import { Dayjs } from 'dayjs'

export type TagType =
  | 'frontend'
  | 'backend'
  | 'devops/sre'
  | 'tech&#8239;health' // non-breaking narrow whitespace
  | 'consulting'
  | 'other'
  | 'non&#8209;tech' // non-breaking hyphen

export enum LevelType {
  'been confronted',
  'used before',
  'familiar',
  'well-versed',
  'expert',
}

export type LanguageType = 'en' | 'de'
type MultiLanguageContent<T> = {
  [key in LanguageType]: T
}
type SingleLanguageContent<T> = { ['intl']: T }

export type IntlContentType<T> =
  | MultiLanguageContent<T>
  | SingleLanguageContent<T>

export const isSingleLanguageContentTypeGuard = <T>(
  content: IntlContentType<T>,
): content is SingleLanguageContent<T> =>
  (content as SingleLanguageContent<T>).intl !== undefined

export type ListItemType = {
  label: IntlContentType<string>
  tags?: TagType[]
}

export type TimeType = {
  from: Dayjs
  to?: Dayjs
}

export type CvItemType = {
  label: IntlContentType<string>
  time?: TimeType
  tagLine?: IntlContentType<string>
  list?: ListItemType[]
  tags?: TagType[]
  level?: LevelType
}

export type CvSectionType = {
  heading: IntlContentType<string>
  items: CvItemType[]
}

export type SkillSectionType = {
  heading: IntlContentType<string>
  items: CvSectionType[]
}
