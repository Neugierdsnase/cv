<script lang="ts">
  import clsx from 'clsx'
  import { CvItemType } from '../../types'
  import { activeFilters } from '../../stores/filters'
  import Level from './Level.svelte'
  export let item: CvItemType
  const { label, level, tags } = item

  $: isActive = Boolean(
    $activeFilters.find((f) => f === label),
  )
</script>

<dt>{@html label}</dt>
{#if tags && tags.length}
  <dd class="flex items-center">
    <Level {level} />
    <ul class="flex flex-row-reverse">
      {#each tags as tag}
        <li
          class={clsx(
            'ml-4',
            'bg-babyBlue-300',
            'px-2',
            'h-6',
            isActive && 'bg-babyBlue-400',
          )}
        >
          <span class="text-xs text-black-rich">
            {@html tag}
          </span>
        </li>
      {/each}
    </ul>
  </dd>
{/if}
