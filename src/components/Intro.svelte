<script lang="ts">
  import { contentLangState } from '../stores/ui'
  import { IntlContentType } from '../types'

  import { getIntlContent } from '../utility'

  export let text: IntlContentType<string[]>
</script>

<div
  class="mt-56 flex flex-col items-center print:mb-16 print:mt-16"
>
  <div
    class="mb-16 h-[clamp(300px,50vw,1000px)] w-[clamp(300px,50vw,1000px)] bg-[url('../img/WORKSPACE.svg')] bg-contain bg-blend-difference print:hidden"
  />
  <div>
    {#each getIntlContent(text, $contentLangState) as paragraph}
      <p class="pb-4">
        {@html paragraph}
      </p>
    {/each}
  </div>
</div>
