<script lang="ts">
  import { contentLangState } from '../stores/ui'
  import { IntlContentType } from '../types'

  import { getIntlContent } from '../utility'

  export let text: IntlContentType<string[]>
</script>

{#each getIntlContent(text, $contentLangState) as paragraph}
  <p class="pb-4">
    {@html paragraph}
  </p>
{/each}
