<script lang="ts">
  import DetailsCard from './DetailsCard.svelte'
  import { fade } from 'svelte/transition'
  import { closeModal, showModalState } from '../stores/ui'
  import { ListItemType, TagType, TimeType } from '../types'

  let list: ListItemType[]
  let time: TimeType
  let tags: TagType[]
  let logo: string

  $: {
    const state = $showModalState
    if (state !== undefined) {
      list = state.list
      time = state.time
      tags = state.tags
      logo = state.logo
    }
  }
</script>

<div
  in:fade={{ duration: 200 }}
  out:fade={{ duration: 300, delay: 300 }}
  class="absolute inset-0 z-30 bg-base-100/70"
>
  <div class="fixed inset-48">
    <!-- Close Button -->
    <button
      class="absolute -right-12 top-0 flex h-12 w-12 items-center justify-center text-2xl text-base-content transition-transform hover:rotate-90"
      transition:fade={{ duration: 300, delay: 300 }}
      on:click={closeModal}
    >
      <i class="ph-bold ph-x cursor-pointer" />
    </button>
    <div
      class="relative inset-0 grid h-full w-full grid-cols-5 gap-8"
    >
      <DetailsCard
        index={2}
        className="w-full col-span-1 row-span-2"
      >
        Here goes the logo
      </DetailsCard>
      <!-- Template Card -->
      <DetailsCard
        index={1}
        className="col-span-4 row-span-4"
      >
        <!-- All the things I did go here -->
        <!-- {#each list as item} -->
        <!--   <p>{item}</p> -->
        <!-- {/each} -->
      </DetailsCard>
      <!-- Time -->
      <DetailsCard
        index={3}
        className="col-span-1 row-span-1 row-start-3 col-start-1"
      >
        {time}
      </DetailsCard>
    </div>
  </div>
</div>
