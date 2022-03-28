<script lang="ts">
  import { CvItemType } from '../../types/CvItemType';
  import {CaretDown} from 'phosphor-svelte'
  import clsx from 'clsx'

	import ListItem from './ListItem.svelte';
  import CvItemTag from './CvItemTag.svelte';
  export let cvItem: CvItemType;

  let {heading, time, tagLine, list, tags} = cvItem;
  let listOpen = false;
</script>

<article class="border-t-4 border-babyBlue-300 pb-8 lg:pt-8 px-4">
  <div class="flex flex-col lg:flex-row">

    {#if tags}
      <ul class="flex flex-row lg:flex-col print:none lg:border-r-4 border-babyBlue-300 lg:mr-8">
        {#each tags as tag}
          <CvItemTag {tag} />
        {/each}
      </ul>
    {/if}
    
    <div class="flex flex-col relative w-full">
      <h2 class="text-cover font-display font-bold w-2/3">{@html heading}</h2>
      <p class="absolute rotate-90 md:rotate-0 print:rotate-0 print:relative top-4 right-4 opacity-60 w-1/4 font-bold font-cover font-2xl text-right">{time}</p>
      {#if Boolean(tagLine)}
      <subtitle class="font-cover">{@html tagLine}</subtitle>
      {/if}
    </div>
  </div>
    
  <div on:click={() => {listOpen = !listOpen}} class={`${clsx('w-fit', 'transition-transform', 'fill-babyBlue-300', 'ml-auto', 'cursor-pointer', 'print:hidden', listOpen && 'rotate-180')}`}>
    <CaretDown size="36px" color='inherit' />
  </div>
  <ul class="mt-8 bg-cultured bg-opacity-10">
      {#each list as listItem, index}
        <ListItem {index} {listItem} show={listOpen} />
      {/each}
    </ul>
</article>