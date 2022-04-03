<script lang="ts">
  import SectionHeading from './../SectionHeading.svelte'
  import { CvSectionType } from '../../types'

  import CvItem from './CvItem.svelte'

  export let cvItems: CvSectionType
  $: heading = cvItems.heading
  $: items = cvItems.items
</script>

<template>
  {#if items && items.length}
    <SectionHeading>
      {@html heading}
    </SectionHeading>
    {#each items as cvItem (cvItem)}
      <CvItem {cvItem} />
    {/each}
  {/if}
</template>
