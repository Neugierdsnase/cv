<script lang="ts">
  import clsx from 'clsx'
  import {
    activeFiltersState,
    filterData,
    hideNonTechState,
  } from '../../stores/filters'
  import { contentLangState } from '../../stores/ui'
  import { nonTechFilterLabel } from '../../ui-text'
  import { getIntlContent } from '../../utility'

  const handleClick = (
    e: Event & {
      currentTarget: EventTarget & HTMLInputElement
    },
  ) => {
    e.preventDefault()
    hideNonTechState.update((s) => !s)
    filterData($activeFiltersState, $hideNonTechState)
  }
</script>

<div class="flex">
  <div
    class="relative mr-2 inline-block w-10 select-none align-middle transition duration-200 ease-in"
  >
    <input
      type="checkbox"
      id="hideNonTechState"
      name="hideNonTechState"
      checked={$hideNonTechState}
      on:change={(e) => handleClick(e)}
      class={clsx(
        'absolute',
        'block',
        'h-6',
        'w-6',
        'cursor-pointer',
        'appearance-none',
        'rounded-full',
        'left-0',
        'transition-all',
        $hideNonTechState
          ? 'translate-x-4 bg-babyBlue-400'
          : 'bg-white',
      )}
    />
    <label
      class={clsx(
        'block',
        'h-6',
        'cursor-pointer',
        'overflow-hidden',
        'rounded-full',
        'transition-all',
        $hideNonTechState
          ? 'bg-babyBlue-200'
          : 'bg-gray-300',
      )}
      for="hideNonTechState"
    />
  </div>

  <label for="hideNonTechState">
    {getIntlContent(nonTechFilterLabel, $contentLangState)}
  </label>
</div>
