<script lang="ts">
  import { CvItemType } from '../../types'
  import clsx from 'clsx'

  import ListItem from './ListItem.svelte'
  import CvItemTag from './CvItemTag.svelte'
  import { CaretDown } from 'phosphor-svelte'
  import Time from './Time.svelte'

  export let cvItem: CvItemType

  let { label, time, tagLine, list, tags } = cvItem
  let listOpen = false
</script>

<article
  class="border-t-4 border-babyBlue-300 px-4 pb-8 print:hidden lg:mx-auto lg:w-2/3 lg:pt-8"
>
  <div class="flex flex-col lg:flex-row">
    {#if tags}
      <ul
        class="flex h-10 flex-row items-stretch overflow-x-scroll border-babyBlue-300 lg:mr-8 lg:h-auto lg:flex-col lg:overflow-x-hidden lg:border-r-4 lg:pr-8"
      >
        <li
          class="stripes mr-2 w-24 print:hidden lg:hidden"
        />
        {#each tags as tag}
          <CvItemTag {tag} />
        {/each}
      </ul>
    {/if}

    <div class="relative mt-4 flex w-full flex-col">
      <h3
        class="text-h3 w-2/3 font-display font-bold leading-none"
      >
        {@html label}
      </h3>
      <Time {time} />
      {#if Boolean(tagLine)}
        <p class="font-cover  w-2/3">
          {@html tagLine}
        </p>
      {/if}
    </div>
  </div>

  {#if list && list.length}
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
  {/if}
</article>

<!-- Print version -->
<div class="hidden break-inside-avoid print:block">
  <h3 class="font-cover text-2xl">
    {@html label}
  </h3>
  {#if Boolean(tagLine)}
    <p class="font-cover  w-2/3">
      {@html tagLine}
    </p>
  {/if}
  <Time {time} />
  {#if list && list.length}
    <ul class="my-4">
      {#each list as listItem, index}
        <ListItem {index} {listItem} show />
      {/each}
    </ul>
  {/if}
</div>
