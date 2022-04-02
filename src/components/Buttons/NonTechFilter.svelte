<script lang="ts">
  import clsx from 'clsx'
  import {
    activeFiltersState,
    filterData,
    hideNonTechState,
  } from '../../stores/filters'

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
        'bg-white',
        'left-0',
        'transition-transform',
        $hideNonTechState && 'translate-x-4',
        'bg-babyBlue-400',
      )}
    />
    <label
      class={clsx(
        'block',
        'h-6',
        'cursor-pointer',
        'overflow-hidden',
        'rounded-full',
        'bg-gray-300',
        $hideNonTechState && 'bg-babyBlue-200',
        'focus-within:outline-2',
        'outline-babyBlue-400',
      )}
      for="hideNonTechState"
    />
  </div>

  <label for="hideNonTechState">
    non-tech verstecken
  </label>
</div>
