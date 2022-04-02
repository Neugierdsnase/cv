import { writable } from 'svelte/store'
import { HIDE_NON_TECH_INITIALLY } from '../constants'
import data from '../data'
import { filterNonTech } from '../utility'

export const cvJobItemsState = writable({
  ...data.cvJobItems,
  items: filterNonTech(
    HIDE_NON_TECH_INITIALLY,
    data.cvJobItems.items,
  ),
})
export const cvEduItemsState = writable({
  ...data.cvEduItems,
  items: filterNonTech(
    HIDE_NON_TECH_INITIALLY,
    data.cvEduItems.items,
  ),
})
export const skillsState = writable(
  data.skills.map((skill) => ({
    ...skill,
    items: filterNonTech(
      HIDE_NON_TECH_INITIALLY,
      skill.items,
    ),
  })),
)
export const miscState = writable(data.misc)
