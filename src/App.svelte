<script lang="ts">
	import { CvItemsType } from './types';
  import "./app.css";
	import Hero from './components/Hero.svelte';
	import Main from './components/Main.svelte';

	export let cvJobItems: CvItemsType;
	export let cvEduItems: CvItemsType;
</script>

<Hero />
<Main cvJobItems={cvJobItems} cvEduItems={cvEduItems} />