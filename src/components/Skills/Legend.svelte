<script lang="ts">
  import { LevelEnum } from '../../types'
  import Level from './Level.svelte'
</script>

<div class="mb-8 flex justify-center">
  <div
    class="join flex max-w-4xl print:bg-white print:text-black"
  >
    {#each [0, 1, 2, 3, 4] as n}
      <div
        class="join-item flex flex-col items-center bg-base-300 p-4 print:bg-white print:text-black"
      >
        <Level level={n} />
        <span>{LevelEnum[n]}</span>
      </div>
    {/each}
  </div>
</div>
