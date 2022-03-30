<script lang="ts">
  import { CvSection } from '../../data'

  export let skills: CvSection[]
  const { heading, items } = skills[0]
</script>

<template>
  {#if items && items.length}
    <section>
      <h2>{heading}</h2>
      <ul>
        {#each items as { label, level, tags }}
          <li>{label}</li>
        {/each}
      </ul>
    </section>
  {/if}
</template>
