<script lang="ts">
	import CvItem from './components/CvItem.svelte';
	import { CvItemType } from './types/CvItemType';
  import "./app.css";

	export let cvItems: CvItemType[];
</script>

<header class="h-screen/2 bg-gradient-to-b from-babyBlue-bright to-richBlack">
	<h1>Lebenslauf Konstantin Kovar</h1>
</header>

<main>
	{#each cvItems as cvItem}
	<CvItem cvItem={cvItem} />
	{/each}
</main>


