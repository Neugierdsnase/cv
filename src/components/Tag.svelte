<script lang="ts">
  import clsx from 'clsx'
  import {
    cvEduItemsState,
    cvJobItemsState,
    skillsState,
  } from '../stores/data'
  import { activeFiltersState } from '../stores/filters'
  import { CvItemType, TagType } from '../types'
  import _ from 'lodash'
  import data from '../data'
  export let size: 's' | 'm'

  export let tag: TagType
  $: isActive = Boolean(
    $activeFiltersState.find((f) => f === tag),
  )

  const SIZES = {
    s: 'px-2',
    m: 'px-4',
  }

  const compareFiltersToItems = (
    items: CvItemType[],
    filters: TagType[],
  ): CvItemType[] => {
    if (!filters.length) {
      return items
    }
    const newItems = items.filter(({ tags }) => {
      const inter = _.intersection(tags, filters)
      return Boolean(inter.length)
    })
    return newItems
  }

  const filterData = (filters: TagType[]) => {
    cvJobItemsState.set({
      ...data.cvJobItems,
      items: compareFiltersToItems(
        data.cvJobItems.items,
        filters,
      ),
    })

    cvEduItemsState.set({
      ...data.cvEduItems,
      items: compareFiltersToItems(
        data.cvEduItems.items,
        filters,
      ),
    })

    skillsState.set(
      data.skills.map((skill) => ({
        ...skill,
        items: compareFiltersToItems(skill.items, filters),
      })),
    )
  }

  const toggleFilter = (
    tag: TagType,
    isActive: boolean,
  ) => {
    activeFiltersState.update((filters) => {
      if (isActive) {
        // return all filters except for this one
        return filters.filter((f) => f !== tag)
      }
      return [tag, ...filters]
    })
    filterData($activeFiltersState)
  }
</script>

<button
  on:click={() => toggleFilter(tag, isActive)}
  class={clsx(
    'cursor-pointer',
    'mr-2',
    'bg-babyBlue-300',
    'py-1',
    SIZES[size],
    'lg:mb-4',
    'select-none',
    isActive && 'bg-babyBlue-400',
  )}
>
  <span class="text-xs font-bold text-black-rich">
    {@html tag}
  </span>
</button>
