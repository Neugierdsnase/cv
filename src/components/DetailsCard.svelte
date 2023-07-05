<script lang="ts">
  import { circIn, circOut } from 'svelte/easing'
  import { fly } from 'svelte/transition'

  export let index: number = 0
  export let className: string = ''
  export let innerClassName: string = ''
</script>

<section
  class={`relative z-30 h-full min-h-max w-full overflow-hidden rounded-xl bg-base-200/70 p-8 shadow-xl shadow-base-300 backdrop-blur-md ${className}`}
  in:fly={{
    y: 300,
    duration: 200,
    delay: 100 * index,
    easing: circOut,
  }}
  out:fly={{
    y: -300,
    duration: 125,
    delay: 75 * index,
    easing: circIn,
  }}
>
  <div
    class={`z-10 h-full text-base-content ${innerClassName}`}
  >
    <slot />
  </div>
</section>
