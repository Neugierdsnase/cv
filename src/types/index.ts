type Tag =
  | 'frontend'
  | 'backend'
  | 'devops/sre'
  | 'tech health/monitoring'
  | 'consulting'
  | 'other'
  | 'non&#8209;tech' // non-breaking hyphen

enum Level {
  'heard of it',
  'used before',
  'familiar',
  'well-versed',
  'expert',
}

type Skill = {
  label: string
  level?: Level 
  tags?: Tag[]
}

export type UnstructuredSection = {
  heading: string,
  text: string,
}

export type SkillGroup = {
  heading: string 
  items: Skill[]
}

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
  heading: string
  items: CvItemType[]
}
