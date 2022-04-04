<script lang="ts">
  import { CvItemType } from '../../types'
  import Tag from '../Tag.svelte'
  import Level from './Level.svelte'
  export let item: CvItemType
  const { label, level, tags } = item
</script>

<dt class="shrink text-ellipsis line-clamp-1">
  {@html label}
</dt>
{#if tags && tags.length}
  <dd class="ml-4 flex max-w-full items-center">
    <Level {level} />
    <ul class="flex flex-row-reverse print:hidden">
      {#each tags as tag}
        <li class="ml-4">
          <Tag size="s" {tag} />
        </li>
      {/each}
    </ul>
  </dd>
{/if}
