<script lang="ts">
  import { CvSection } from '../../data'
  import Skill from './Skill.svelte'

  export let skills: CvSection[]
</script>

<div class="mx-auto flex flex-wrap gap-4 lg:w-2/3">
  {#if skills && skills.length}
    {#each skills as skill}
      <Skill {skill} />
    {/each}
  {/if}
</div>
