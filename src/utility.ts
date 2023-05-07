import {
  CvItemType,
  IntlContentType,
  isSingleLanguageContentTypeGuard,
  LanguageType,
} from './types'

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

// handle clicks outside of DOM node
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

export const getIntlContent = <T>(
  intlContent: IntlContentType<T>,
  contentLangState: LanguageType,
): T => {
  if (isSingleLanguageContentTypeGuard(intlContent)) {
    return intlContent.intl
  }

  return intlContent[contentLangState]
}
