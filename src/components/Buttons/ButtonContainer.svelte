<script lang="ts">
  export let onClick: () => void
</script>

<button
  on:click={() => onClick()}
  class="flex h-16 w-16 items-center justify-center rounded-full bg-black-dark"
>
  <slot />
</button>
