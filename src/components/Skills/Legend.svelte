<script lang="ts">
  import { LevelEnum } from '../../types'
  import Level from './Level.svelte'
</script>

<div
  class="mb-8 flex justify-center print:mx-auto print:mb-0 print:w-fit print:border-2 print:border-black"
>
  <div
    class="join-vertical join max-w-4xl print:join-horizontal lg:join-horizontal print:bg-white print:text-xs print:text-black"
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
