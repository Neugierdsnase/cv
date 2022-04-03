<script lang="ts">
  let y: number
</script>

<svelte:window bind:scrollY={y} />

<section
  id="hero"
  class="h-screen-2/3 fixed top-0 z-30 w-full"
  style={`transform: translateY(-${y}px);`}
>
  <div
    class="hero-clip-path flex h-full w-full items-center justify-center"
  >
    <div>
      <h1 class="text-hero font-bold text-babyBlue-400">
        {@html `Konstantin Kovar`}
      </h1>
    </div>
  </div>
</section>
