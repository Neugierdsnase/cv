<script lang="ts">
  import { type CvItemsType } from '../../types'
  import CvItem from './CvItem.svelte'

  export let cvItems: CvItemsType
  const { heading, items } = cvItems
</script>

<template>
  {#if items && items.length}
    <div
      class="mt-20 mb-12 flex justify-end bg-babyBlue-300 p-8"
    >
      <h2
        class="text-hero border-t-8 border-black-rich pl-8 text-right font-display font-bold text-black-rich"
      >
        {heading}
      </h2>
    </div>
    {#each items as cvItem}
      <CvItem {cvItem} />
    {/each}
  {/if}
</template>
