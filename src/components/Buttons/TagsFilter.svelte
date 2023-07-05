<script lang="ts">
  import { tagsFilterLabel } from './../../ui-text'
  import { getIntlContent } from './../../utility'
  import { ALL_TAGS } from '../../constants'
  import { contentLangState } from '../../stores/ui'
  import Tag from './Tag.svelte'
</script>

<div>
  <p class="pb-4">
    {getIntlContent(tagsFilterLabel, $contentLangState)}
  </p>
  <div class="flex flex-wrap gap-2">
    {#each ALL_TAGS as tag}
      <Tag {tag} />
    {/each}
  </div>
</div>
