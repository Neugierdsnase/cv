import { writable } from 'svelte/store'
import { LanguageType } from '../types'

export const showSidebarState = writable(false)
export const contentLangState = writable<LanguageType>('de')