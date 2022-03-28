<script lang="ts">
	import { CvItemType } from './types/CvItemType';
  import "./app.css";
	import Hero from './components/Hero.svelte';
	import Main from './components/Main.svelte';

	export let cvItems: CvItemType[];
</script>

<Hero />
<Main cvItems={cvItems} />


