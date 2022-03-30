<script lang="ts">
  import clsx from 'clsx'
  import {
    cvEduItems,
    cvJobItems,
    skills,
  } from '../../stores/data'
  import { activeFilters } from '../../stores/filters'
  import { Tag } from '../../types'
  import _ from 'lodash'

  export let tag: Tag
  $: isActive = Boolean(
    $activeFilters.find((f) => f === tag),
  )

  const filterData = (filters: Tag[]) => {
    cvJobItems.update((s) => {
      const t = _.cloneDeep(s)
      t.filterItems(filters)
      return t
    })

    cvEduItems.update((s) => {
      const t = _.cloneDeep(s)
      t.filterItems(filters)
      return t
    })

    // skills.update((s) => {
    //   s.filterItems(filters)

    //   return s
    // })
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
