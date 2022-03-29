type Tag =
  | 'frontend'
  | 'backend'
  | 'devops/sre'
  | 'tech health/monitoring'
  | 'consulting'
  | 'other'
  | 'non&#8209;tech' // non-breaking hyphen

type Level =
  | 'expert'
  | 'well-versed'
  | 'familiar'
  | 'used before'
  | 'heard of it'

export type ListItemType = {
  label: string
  tags?: Tag[]
}

export type CvItemType = {
  heading: string
  time: string
  tagLine?: string
  list?: ListItemType[]
  tags?: Tag[]
}

export type CvItemsType = {
  heading: string,
  items: CvItemType[]
}
