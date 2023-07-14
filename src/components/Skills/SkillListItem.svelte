<script lang="ts">
  import { contentLangState } from '../../stores/ui'

  import { CvItemType } from '../../types'
  import Tag from '../Buttons/Tag.svelte'
  import { getIntlContent } from '../../utility'
  import Level from './Level.svelte'
  export let item: CvItemType
  const { label, level, tags } = item
</script>

<dt class="line-clamp-1 shrink text-ellipsis">
  {@html getIntlContent(label, $contentLangState)}
</dt>
{#if tags && tags.length}
  <dd class="ml-4 flex max-w-full items-center">
    <ul class="flex flex-row-reverse print:hidden">
      {#each tags as tag}
        <li>
          <Tag {tag} />
        </li>
      {/each}
    </ul>
    <Level {level} />
  </dd>
{/if}
