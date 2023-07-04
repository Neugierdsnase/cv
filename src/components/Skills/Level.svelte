<script lang="ts">
  import { LevelEnum } from '../../types'

  export let level: LevelEnum
</script>

<template>
  {#if level}
    <div
      title={LevelEnum[level]}
      class="flex fill-babyBlue-300 print:hidden"
    >
      {#each [0, 1, 2, 3, 4] as n}
        <i
          class="ph-star"
          class:ph-light={level < n}
          class:ph-fill={level >= n}
        />
      {/each}
    </div>

    <!-- Print version -->
    <div class="hidden print:block">
      <span>{`${level + 1}/5`}</span>
    </div>
  {/if}
</template>
