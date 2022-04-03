<script lang="ts">
  import clsx from 'clsx'
  import {
    activeFiltersState,
    filterData,
    hideNonTechState,
  } from '../stores/filters'
  import { TagType } from '../types'
  export let size: 's' | 'm'

  export let tag: TagType
  $: isActive = Boolean(
    $activeFiltersState.find((f) => f === tag),
  )

  const SIZES = {
    s: 'px-2',
    m: 'px-4',
  }

  const toggleFilter = (
    tag: TagType,
    isActive: boolean,
  ) => {
    activeFiltersState.update((filters) => {
      if (isActive) {
        return filters.filter((f) => f !== tag)
      }
      return [tag, ...filters]
    })
    filterData($activeFiltersState, $hideNonTechState)
  }
</script>

<button
  on:click={() => toggleFilter(tag, isActive)}
  class={clsx(
    'cursor-pointer',
    'bg-babyBlue-300',
    'py-1',
    SIZES[size],
    'select-none',
    'ring-babyBlue-300',
    isActive && 'bg-babyBlue-400 ring-4',
  )}
>
  <span
    class={clsx(
      'text-xs',
      'font-bold',
      'text-babyBlue-400',
      isActive && 'text-babyBlue-300',
    )}
  >
    {@html tag}
  </span>
</button>
