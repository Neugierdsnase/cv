<script lang="ts">
import { CvItemType } from '../../types/CvItemType';

	import ListItem from './ListItem.svelte';
  export let cvItem: CvItemType;

  let {heading, time, tagLine, list, tags} = cvItem;
</script>

<article class="border-t-4 border-cultured py-8 px-4">
  <div class="flex flex-col lg:flex-row">

    {#if tags}
    <ul class="flex flex-col lg:flex-row print:none">
      {#each tags as tag}
      <li>{tag}</li>
      {/each}
    </ul>
    {/if}
    
    <div class="flex flex-col relative">
      <h2 class="uppercase text-2xl">{@html heading}</h2>
      <p class="absolute print:relative top-4 right-4 opacity-60">{time}</p>
      {#if Boolean(tagLine)}
      <subtitle>{@html tagLine}</subtitle>
      {/if}
    </div>
  </div>
    
  <ul>
      {#each list as listItem}
        <ListItem text={listItem} />
      {/each}
    </ul>
</article>