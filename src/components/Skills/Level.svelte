<script lang="ts">
  import { Star } from 'phosphor-svelte'

  import { LevelType } from '../../types'

  export let level: LevelType
</script>

<template>
  {#if level}
    <div
      title={LevelType[level - 1]}
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
