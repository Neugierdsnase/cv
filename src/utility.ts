import _ from 'lodash'
import data from './data'
import { cvEduItemsState, cvJobItemsState, skillsState } from './stores/data'
import { CvItemType, TagType } from './types'

export const filterNonTech = (
  enforce: boolean,
  items: CvItemType[],
): CvItemType[] => {
  if (!enforce) {
    return items
  }
  return items.filter(
    ({ tags }) => !tags.includes('non&#8209;tech'),
  )
}

export const clickOutside = (node) => {
  const handleClick = (event) => {
    if (
      node &&
      !node.contains(event.target) &&
      !event.defaultPrevented
    ) {
      node.dispatchEvent(
        new CustomEvent('outsideClick', node),
      )
    }
  }

  document.addEventListener('click', handleClick, true)

  return {
    destroy() {
      document.removeEventListener(
        'click',
        handleClick,
        true,
      )
    },
  }
}
