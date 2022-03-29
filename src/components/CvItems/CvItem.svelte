<script lang="ts">
  import { CvItemType } from '../../types'
  import clsx from 'clsx'

  import ListItem from './ListItem.svelte'
  import CvItemTag from './CvItemTag.svelte'
  import { CaretDown } from 'phosphor-svelte'
  export let cvItem: CvItemType

  let { heading, time, tagLine, list, tags } = cvItem
  let listOpen = false
</script>

<article class="border-t-4 border-babyBlue-300 px-4 pb-8 lg:pt-8">
  <div class="flex flex-col lg:flex-row">
    {#if tags}
      <ul
        class="print:none flex h-10 flex-row items-stretch border-babyBlue-300 lg:mr-8 lg:h-auto lg:flex-col lg:border-r-4"
      >
        <li class="stripes mr-2 w-24 print:hidden lg:hidden" />
        {#each tags as tag}
          <CvItemTag {tag} />
        {/each}
      </ul>
    {/if}

    <div class="relative flex w-full flex-col">
      <h2 class="text-cover w-2/3 font-display font-bold">
        {@html heading}
      </h2>
      <p
        class="font-cover font-2xl absolute top-4 right-4 w-1/4 rotate-90 text-right font-bold opacity-60 print:relative print:rotate-0 md:rotate-0"
      >
        {time}
      </p>
      {#if Boolean(tagLine)}
        <subtitle class="font-cover">
          {@html tagLine}
        </subtitle>
      {/if}
    </div>
  </div>

  <div
    on:click={() => {
      listOpen = !listOpen
    }}
    class={`${clsx(
      'w-fit',
      'transition-transform',
      'fill-babyBlue-300',
      'ml-auto',
      'cursor-pointer',
      'print:hidden',
      listOpen && 'rotate-180',
    )}`}
  >
    <CaretDown size="36px" color="inherit" />
  </div>
  <ul class="mt-8 bg-cultured bg-opacity-10">
    {#each list as listItem, index}
      <ListItem {index} {listItem} show={listOpen} />
    {/each}
  </ul>
</article>
