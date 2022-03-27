<script lang="ts">
	import { CvItemType } from './types/CvItemType';
  import "./app.css";
	import Header from './components/Header.svelte';
	import Main from './components/Main.svelte';

	export let cvItems: CvItemType[];
</script>

<Header />
<Main cvItems={cvItems} />


