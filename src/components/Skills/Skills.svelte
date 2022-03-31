<script lang="ts">
  import { CvSectionType } from '../../types'

  import Skill from './Skill.svelte'

  export let skills: CvSectionType[]
  $: rSkills = skills
</script>

<div class="mx-auto flex flex-wrap gap-4 lg:w-2/3">
  {#if skills && skills.length}
    {#each rSkills as skill (skill)}
      <Skill {skill} />
    {/each}
  {/if}
</div>
