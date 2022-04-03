<script lang="ts">
  import { LevelType } from '../../types'
  import Level from './Level.svelte'
</script>

<div
  class="my-4 flex flex-wrap justify-around p-4 print:hidden"
>
  {#each [1, 2, 3, 4, 5] as n}
    <div
      class="mr-8 mt-4 flex items-center border-2 border-babyBlue-300 fill-babyBlue-300 py-1 px-2 last:mr-0"
    >
      <Level level={n} />
      <span class="ml-4">{LevelType[n - 1]}</span>
    </div>
  {/each}
</div>
