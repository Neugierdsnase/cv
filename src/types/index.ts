export type TagType =
  | 'frontend'
  | 'backend'
  | 'devops/sre'
  | 'tech health/monitoring'
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

export type UnstructuredSection = {
  label: string
  text: string
  tags?: TagType[]
}

export type ListItemType = {
  label: string
  tags?: TagType[]
}

export type CvItemType = {
  label: string
  time?: string
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
