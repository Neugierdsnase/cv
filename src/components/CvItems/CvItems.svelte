<script lang="ts">
  import SectionHeading from './../SectionHeading.svelte'
  import { CvSectionType } from '../../types'

  import CvItem from './CvItem.svelte'
  import { getIntlContent } from '../../utility'
  import { contentLangState } from '../../stores/ui'

  export let cvItems: CvSectionType
  $: heading = cvItems.heading
  $: items = cvItems.items
</script>

{#if items && items.length}
  <SectionHeading>
    {@html getIntlContent(heading, $contentLangState)}
  </SectionHeading>
  <ul class="mx-auto max-w-4xl">
    {#each items as cvItem (cvItem)}
      <li class="mb-8">
        <CvItem {cvItem} />
      </li>
    {/each}
  </ul>
{/if}
