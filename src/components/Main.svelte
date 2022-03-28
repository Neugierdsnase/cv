<script lang="ts">
  import { type CvItemType } from "../types/CvItemType"
  import CvItem from './CvItems/CvItem.svelte'

  export let cvItems: CvItemType[]
</script>

<main class="px-4 my-8">
		{#each cvItems as cvItem}
		<CvItem cvItem={cvItem} />
		{/each}
</main>