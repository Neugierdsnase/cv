import { writable } from 'svelte/store'
import data from '../data'

export const cvJobItemsState = writable(data.cvJobItems)
export const cvEduItemsState = writable(data.cvEduItems)
export const skillsState = writable(data.skills)
export const miscState = writable(data.misc)
