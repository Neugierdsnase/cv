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

export type IntlContent<T> = {
  [key in LanguageType]: T
} | {['intl']: T}

export type ListItemType = {
  label: IntlContent<string>
  tags?: TagType[]
}

export type TimeType = {
  from: Dayjs
  to?: Dayjs
}

export type CvItemType = {
  label: IntlContent<string>
  time?: TimeType
  tagLine?: IntlContent<string>
  list?: ListItemType[]
  tags?: TagType[]
  level?: LevelType
}

export type CvSectionType = {
  heading: IntlContent<string>
  items: CvItemType[]
}

export type SkillSectionType = {
  heading: IntlContent<string>
  items: CvSectionType[]
}
