<script lang="ts">
  export let text: string
</script>

<div class="mt-56 flex flex-col items-center">
  <div
    class="mb-16 h-[clamp(300px,50vw,1000px)] w-[clamp(300px,50vw,1000px)] bg-[url('../img/WORKSPACE.svg')] bg-contain bg-blend-difference"
  />
  {@html text}
</div>
