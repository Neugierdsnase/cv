<script lang="ts">
	import CvItem from './components/CvItem.svelte';
	import { CvItemType } from './types/CvItemType';

	export let cvItems: CvItemType[];
</script>

<h1>Lebenslauf Konstantin Kovar</h1>

{#each cvItems as cvItem}
	<CvItem cvItem={cvItem} />
{/each}


