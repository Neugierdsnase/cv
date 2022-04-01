<script lang="ts">
  import { CvItemType } from '../../types'
  import { activeFilters } from '../../stores/filters'
  import Level from './Level.svelte'
  import Tag from '../Tag.svelte'
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
        <li class="ml-4">
          <Tag size="s" {tag} />
        </li>
      {/each}
    </ul>
  </dd>
{/if}
