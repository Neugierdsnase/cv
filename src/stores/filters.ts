import { writable } from 'svelte/store'
import { TagType } from '../types'

export const activeFilters = writable<TagType[]>([])
