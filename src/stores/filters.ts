import { writable } from 'svelte/store'
import { HIDE_NON_TECH_INITIALLY } from '../constants'
import data from '../data'
import { CvItemType, LevelEnum, TagType } from '../types'
import { filterNonTech } from '../utility'
import {
  cvJobItemsState,
  cvEduItemsState,
  skillsState,
} from './data'

export const activeFiltersState = writable<TagType[]>([])
export const skillLevelFilterState = writable<LevelEnum>(1)
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
    const inter = tags.filter((tag) =>
      filters.includes(tag),
    )
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

  skillsState.set({
    ...data.skills,
    items: data.skills.items.map((skill) => ({
      ...skill,
      items: filterNonTech(
        hideNonTechState,
        compareFiltersToItems(skill.items, filters),
      ),
    })),
  })
}

export const filterSkills = (n: LevelEnum) => {
  skillLevelFilterState.set(n)
  skillsState.set({
    ...data.skills,
    items: data.skills.items.map((skill) => ({
      ...skill,
      items: skill.items.filter(
        ({ level }) => level >= n || !level,
      ),
    })),
  })
}
