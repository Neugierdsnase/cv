<script lang="ts">
	import {CvItemType} from '../types/CvItemType';
	import ListItem from './ListItem.svelte';
  export let cvItem: CvItemType;

  let {heading, time, tag, list} = cvItem;
</script>

<article>
  <h2>{@html heading}</h2>
  {#if Boolean(tag)}
    <subtitle>{@html tag}</subtitle>
  {/if}
  <p class="">{time}</p>
  <ul>
    {#each list as listItem}
      <ListItem text={listItem} />
    {/each}
  </ul>
</article>