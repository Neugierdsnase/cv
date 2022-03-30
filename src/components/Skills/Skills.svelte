<script lang="ts">
  import { SkillGroup } from '../../types'

  export let skills: SkillGroup
  const { heading, items } = skills
</script>

<section>
  <h2>{heading}</h2>
  <ul>
    {#each items as { label, level, tags }}
      <li>{label}</li>
    {/each}
  </ul>
</section>
