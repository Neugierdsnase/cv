import { writable } from 'svelte/store'
import { LanguageType, ModalContentType } from '../types'

export const showSidebarState = writable(false)
export const contentLangState = writable<LanguageType>('en')
export const showModalState = writable<ModalContentType>()

export const openModalWithValues = (
  modal: ModalContentType,
) => {
  showModalState.update((state) => {
    if (state === undefined) {
      return modal
    }
    return state
  })
}

export const closeModal = () => {
  showModalState.set(undefined)
}
