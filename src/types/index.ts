export type Tag =
  | 'frontend'
  | 'backend'
  | 'devops/sre'
  | 'tech health/monitoring'
  | 'consulting'
  | 'other'
  | 'non&#8209;tech' // non-breaking hyphen

enum Level {
  'been confronted',
  'used before',
  'familiar',
  'well-versed',
  'expert',
}

export type UnstructuredSection = {
  label: string
  text: string
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

export interface ICvSection {
  heading: string
  items: CvItemType[]
  filterItems: (filterList: Tag[]) => void
  hide: (tagToHide: Tag) => void
  showOnly: (tagToShow: Tag) => void
}
