<script lang="ts">
  import { tagsFilterLabel } from './../../ui-text'
  import { getIntlContent } from './../../utility'
  import { ALL_TAGS } from '../../constants'
  import Tag from '../Tag.svelte'
  import { contentLangState } from '../../stores/ui'
</script>

<div>
  <p class="pb-4">
    {getIntlContent(tagsFilterLabel, $contentLangState)}
  </p>
  <div class="flex flex-wrap gap-2">
    {#each ALL_TAGS as tag}
      <Tag size="m" {tag} />
    {/each}
  </div>
</div>
