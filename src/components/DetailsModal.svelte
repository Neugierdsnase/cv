<script lang="ts">
  import DetailsCard from './DetailsCard.svelte'
  import { fade, fly } from 'svelte/transition'
  import {
    closeModal,
    contentLangState,
    showModalState,
  } from '../stores/ui'
  import { ListItemType, TagType, TimeType } from '../types'
  import { getIntlContent } from '../utility'
  import Time from './Time.svelte'

  let list: ListItemType[]
  let time: TimeType
  let tags: TagType[]
  let heading: string

  $: {
    const state = $showModalState
    if (state !== undefined) {
      list = state.list
      time = state.time
      tags = state.tags
      heading = state.heading
    }
  }
</script>

<div
  in:fade={{ duration: 200 }}
  out:fade={{ duration: 300, delay: 300 }}
  class="fixed inset-0 z-30 bg-base-100/70"
>
  <div class="fixed inset-8 top-16 xl:inset-1/4">
    <!-- Close Button -->
    <button
      class="absolute -top-12 right-0 flex h-12 w-12 items-center justify-center text-2xl text-base-content transition-transform hover:rotate-90 xl:-right-12 xl:top-0"
      transition:fade={{ duration: 300, delay: 300 }}
      on:click={closeModal}
    >
      <i class="ph-bold ph-x cursor-pointer" />
    </button>
    <div
      class="relative inset-0 grid h-full w-full grid-cols-3 gap-8"
    >
      <DetailsCard
        index={2}
        className="w-full relative col-span-1 bg-secondary/40 row-span-3"
        ><span
          class="max-w-fit origin-right -rotate-90 border-l-8 border-secondary pl-4 text-2xl font-bold xl:relative xl:rotate-0 xl:border-l-4"
          >{heading}</span
        ></DetailsCard
      >
      <DetailsCard
        index={1}
        className="col-span-2 row-span-4"
      >
        {#if list && list.length}
          <ul>
            {#each list as item, index}
              <li
                in:fly={{ x: 100, delay: 50 * index + 300 }}
                out:fly={{
                  x: 100,
                  delay: 30 * index,
                  duration: 100,
                }}
                class="flex h-20 items-center border-b-2 border-base-content first:border-t-2"
              >
                {@html getIntlContent(
                  item.label,
                  $contentLangState,
                )}
              </li>
            {/each}
          </ul>
        {/if}
      </DetailsCard>
      <!-- Time -->
      <DetailsCard
        index={3}
        className="col-span-1 row-span-1 row-start-4 col-start-1"
        innerClassName="flex flex-col justify-center items-center"
      >
        <p class="text-2xl font-bold text-base-content/80">
          <Time {time} />
        </p>
      </DetailsCard>

      <!-- Tags -->
      <DetailsCard
        index={4}
        className="col-span-3 bg-primary/30 pr-1 h-6 p-0"
        innerClassName="flex justify-center items-center gap-1"
      >
        {#each tags as tag, index}
          <span
            in:fly={{ x: 100, delay: 50 * index + 500 }}
            out:fly={{
              x: 100,
              delay: 30 * index,
              duration: 100,
            }}
            class="badge badge-primary badge-sm"
          >
            {@html tag}
          </span>
        {/each}
      </DetailsCard>
    </div>
  </div>
</div>
