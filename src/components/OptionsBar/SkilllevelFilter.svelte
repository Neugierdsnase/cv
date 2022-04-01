<script lang="ts">
  import { Star } from 'phosphor-svelte'
  import data from '../../data'
  import { skillsState } from '../../stores/data'
  import { skillLevelFilterState } from '../../stores/filters'
  import { Level } from '../../types'
  const skillLevels: Level[] = [1, 2, 3, 4, 5]

  const setSkillsFilter = (n: Level) => {
    skillLevelFilterState.set(n)
    console.log('yup')
    skillsState.set(
      data.skills.map((skill) => ({
        ...skill,
        items: skill.items.filter(
          ({ level }) => level >= n || !level,
        ),
      })),
    )
  }
</script>

<div
  title={Level[$skillLevelFilterState]}
  class="flex fill-babyBlue-300"
>
  {#each skillLevels as n}
    <button on:click={() => setSkillsFilter(n)}>
      <Star
        color="inherit"
        weight={$skillLevelFilterState < n
          ? 'light'
          : 'fill'}
      />
    </button>
  {/each}
</div>
