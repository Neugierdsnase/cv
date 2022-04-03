import { Dayjs } from "dayjs"

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

export type ListItemType = {
  label: string
  tags?: TagType[]
}

export type TimeType = {
  from: Dayjs
  to?: Dayjs
}

export type CvItemType = {
  label: string
  time?: TimeType
  tagLine?: string
  list?: ListItemType[]
  tags?: TagType[]
  level?: LevelType
}

export type CvSectionType = {
  heading: string
  items: CvItemType[]
}

export type SkillSectionType = {
  heading: string
  items: CvSectionType[]
}
