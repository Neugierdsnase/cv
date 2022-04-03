<script lang="ts">
  import { CvSectionType } from './../../types/index'
  import SkillList from './SkillList.svelte'

  export let skill: CvSectionType
  const { heading, items } = skill
</script>

<template>
  {#if items && items.length}
    <section class="min-w-[40%] grow">
      <h2 class="font-display text-2xl font-bold">
        {heading}
      </h2>
      <SkillList {items} />
    </section>
  {/if}
</template>
