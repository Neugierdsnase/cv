<script lang="ts">
  import SectionHeading from './../SectionHeading.svelte'
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
  <SectionHeading>
    {@html skills.heading}
  </SectionHeading>
  <Legend />
  <div class="mx-auto flex flex-wrap gap-4 lg:w-2/3">
    {#each items as skill (skill)}
      <Skill {skill} />
    {/each}
  </div>
{/if}
