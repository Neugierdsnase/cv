<script lang="ts">
  import { Star } from 'phosphor-svelte'

  import { Level } from '../../types'

  export let level: Level
</script>

<template>
  {#if level}
    <div
      title={Level[level]}
      class="flex fill-babyBlue-300"
    >
      {#each [1, 2, 3, 4, 5] as n}
        <Star
          color="inherit"
          weight={level < n ? 'light' : 'fill'}
        />
      {/each}
    </div>
  {/if}
</template>
