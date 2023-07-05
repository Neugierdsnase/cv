<script lang="ts">
  import { LevelEnum } from '../../types'
  import '@phosphor-icons/web/light'
  import '@phosphor-icons/web/fill'

  export let level: LevelEnum
</script>

{#if level !== undefined}
  <div title={LevelEnum[level]} class="print:hidden">
    {#each [0, 1, 2, 3, 4] as n}
      <i
        class="ph-star mr-1 h-8 w-8"
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
