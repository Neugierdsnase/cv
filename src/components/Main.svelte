<script lang="ts">
  import { type CvItemType } from "../types/CvItemType"
	import CvItem from './CvItems/CvItem.svelte';

  export let cvItems: CvItemType[]
</script>

<main>
	{#each cvItems as cvItem}
		<CvItem cvItem={cvItem} />
	{/each}
</main>