import { writable } from 'svelte/store'
import data from '../data'

export const cvJobItems = writable(data.cvJobItems)
export const cvEduItems = writable(data.cvEduItems)
export const skills = writable(data.skills)
export const misc = writable(data.misc)
