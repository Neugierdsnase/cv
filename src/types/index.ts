export type Tag =
  | 'frontend'
  | 'backend'
  | 'devops/sre'
  | 'tech health/monitoring'
  | 'consulting'
  | 'other'
  | 'non&#8209;tech' // non-breaking hyphen

export enum Level {
  'been confronted',
  'used before',
  'familiar',
  'well-versed',
  'expert',
}

export type UnstructuredSection = {
  label: string
  text: string
  tags?: Tag[]
}

export type ListItemType = {
  label: string
  tags?: Tag[]
}

export type CvItemType = {
  label: string
  time?: string
  tagLine?: string
  list?: ListItemType[]
  tags?: Tag[]
  level?: Level
}

export type CvSectionType = {
  heading: string
  items: CvItemType[]
}
