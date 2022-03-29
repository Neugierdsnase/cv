<script lang="ts">
  import { type CvItemsType } from "../../types"
  import CvItem from "./CvItem.svelte";

  export let cvItems: CvItemsType
</script>

{#each cvItems.items as cvItem}
  <CvItem cvItem={cvItem} />
{/each}