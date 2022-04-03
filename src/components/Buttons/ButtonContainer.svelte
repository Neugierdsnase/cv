<script lang="ts">
  export let onClick: () => void
</script>

<button
  on:click={() => onClick()}
  class="z-20 flex h-16 w-16 items-center justify-center rounded-full bg-babyBlue-200 text-babyBlue-400"
>
  <slot />
</button>
