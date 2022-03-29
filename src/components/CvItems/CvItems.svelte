<script lang="ts">
  import { type CvItemsType } from "../../types/CvItemType"
  import CvItem from './CvItems/CvItem.svelte'

  export let cvItems: CvItemsType
</script>

{#each cvItems.items as cvItem}
  <CvItem cvItem={cvItem} />
{/each}