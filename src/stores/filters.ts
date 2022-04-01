import { writable } from 'svelte/store'
import { Level, TagType } from '../types'

export const activeFiltersState = writable<TagType[]>([])
export const skillLevelFilterState = writable<Level>(1)
