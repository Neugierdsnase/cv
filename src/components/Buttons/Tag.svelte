<script lang="ts">
  import {
    activeFiltersState,
    filterData,
    hideNonTechState,
  } from '../../stores/filters'
  import { type TagType } from '../../types'
  export let size: 's' | 'm' = 'm'

  export let tag: TagType
  $: isActive = Boolean(
    $activeFiltersState.find((f) => f === tag),
  )

  // todo: belongs to the store
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
  class="badge m-1 select-none"
  class:badge-sm={size === 's'}
  class:badge-md={size === 'm'}
  class:badge-secondary={isActive}
  class:badge-primary={!isActive}
>
  {@html tag}
</button>
