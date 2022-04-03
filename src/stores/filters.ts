import _ from 'lodash'
import { writable } from 'svelte/store'
import { HIDE_NON_TECH_INITIALLY } from '../constants'
import data from '../data'
import { CvItemType, Level, TagType } from '../types'
import { filterNonTech } from '../utility'
import {
  cvJobItemsState,
  cvEduItemsState,
  skillsState,
} from './data'

export const activeFiltersState = writable<TagType[]>([])
export const skillLevelFilterState = writable<Level>(1)
export const hideNonTechState = writable(
  HIDE_NON_TECH_INITIALLY,
)

const compareFiltersToItems = (
  items: CvItemType[],
  filters: TagType[],
): CvItemType[] => {
  if (!filters.length) {
    return items
  }
  const newItems = items.filter(({ tags }) => {
    const inter = _.intersection(tags, filters)
    return Boolean(inter.length)
  })
  return newItems
}

export const filterData = (
  filters: TagType[],
  hideNonTechState: boolean,
) => {
  cvJobItemsState.set({
    ...data.cvJobItems,
    items: filterNonTech(
      hideNonTechState,
      compareFiltersToItems(data.cvJobItems.items, filters),
    ),
  })

  cvEduItemsState.set({
    ...data.cvEduItems,
    items: filterNonTech(
      hideNonTechState,
      compareFiltersToItems(data.cvEduItems.items, filters),
    ),
  })

  skillsState.set(
    data.skills.map((skill) => ({
      ...skill,
      items: filterNonTech(
        hideNonTechState,
        compareFiltersToItems(skill.items, filters),
      ),
    })),
  )
}
