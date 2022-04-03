<script lang="ts">
  import {
    CvSectionType,
    SkillSectionType,
  } from '../../types'
  import Legend from './Legend.svelte'

  import Skill from './Skill.svelte'

  export let skills: SkillSectionType
  $: items = skills.items
</script>

{#if items && items.length}
  <h2
    class="text-h2 text-right font-display font-bold text-babyBlue-400"
  >
    {skills.heading}
  </h2>
  <Legend />
  <div class="mx-auto flex flex-wrap gap-4 lg:w-2/3">
    {#each items as skill (skill)}
      <Skill {skill} />
    {/each}
  </div>
{/if}
