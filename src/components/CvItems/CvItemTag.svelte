<script lang="ts">
  import clsx from 'clsx'
  import {
    cvEduItems,
    cvJobItems,
    skills,
  } from '../../stores/data'
  import { activeFilters } from '../../stores/filters'
  import { CvItemType, Tag } from '../../types'
  import _ from 'lodash'
  import data from '../../data'

  export let tag: Tag
  $: isActive = Boolean(
    $activeFilters.find((f) => f === tag),
  )

  const compareFiltersToItems = (
    items: CvItemType[],
    filters: Tag[],
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

  const filterData = (filters: Tag[]) => {
    cvJobItems.set({
      ...data.cvJobItems,
      items: compareFiltersToItems(
        data.cvJobItems.items,
        filters,
      ),
    })

    cvEduItems.set({
      ...data.cvEduItems,
      items: compareFiltersToItems(
        data.cvEduItems.items,
        filters,
      ),
    })

    skills.set(
      data.skills.map((skill) => ({
        ...skill,
        items: compareFiltersToItems(skill.items, filters),
      })),
    )
  }

  const toggleFilter = (tag: Tag, isActive: boolean) => {
    activeFilters.update((filters) => {
      if (isActive) {
        // return all filters except for this one
        return filters.filter((f) => f !== tag)
      }
      return [tag, ...filters]
    })
    filterData($activeFilters)
  }
</script>

<li
  on:click={() => toggleFilter(tag, isActive)}
  class={clsx(
    'cursor-pointer',
    'mr-2',
    'bg-babyBlue-300',
    'py-1',
    'px-4',
    'lg:mb-4',
    'select-none',
    isActive && 'bg-babyBlue-400',
  )}
>
  <span class="text-xs font-bold text-black-rich">
    {@html tag}
  </span>
</li>
