<script lang="ts">
	import { CvItemType } from './types/CvItemType';
  import "./app.css";
	import Hero from './components/Hero.svelte';
	import Main from './components/Main.svelte';

	export let cvJobItems: CvItemType[];
</script>

<Hero />
<Main cvItems={cvJobItems} />