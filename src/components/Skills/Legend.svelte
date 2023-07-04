<script lang="ts">
  import { LevelEnum } from '../../types'
  import Level from './Level.svelte'
</script>

<div class="join">
  {#each [0, 1, 2, 3, 4] as n}
    <div class="join-item">
      <Level level={n} />
      <span class="ml-4">{LevelEnum[n]}</span>
    </div>
  {/each}
</div>
