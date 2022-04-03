<script lang="ts">
  let y: number
</script>

<svelte:window bind:scrollY={y} />

<section
  id="hero"
  class="fixed top-0 z-30 h-[80vh] w-full"
  style={`transform: translateY(-${y}px);`}
>
  <div
    class="hero-clip-path flex h-full w-full items-center justify-center"
  >
    <div>
      <h1 class="text-h1 font-bold text-babyBlue-400">
        {@html `Konstantin Kovar`}
      </h1>
    </div>
  </div>
</section>
