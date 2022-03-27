type Tags =
  | 'frontend'
  | 'backend'
  | 'devops/sre'
  | 'tech health/monitoring'
  | 'other'
  | 'non-technical'

export type CvItemType = {
  heading: string
  time: string
  tagLine?: string
  list: string[]
  tags?: Tags[]
}
