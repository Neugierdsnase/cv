<script lang="ts">
  import { Star } from 'phosphor-svelte'
  import data from '../../data'
  import { skillsState } from '../../stores/data'
  import { skillLevelFilterState } from '../../stores/filters'
  import { LevelType } from '../../types'
  const skillLevels: LevelType[] = [1, 2, 3, 4, 5]

  const setSkillsFilter = (n: LevelType) => {
    skillLevelFilterState.set(n)
    skillsState.set(
      data.skills.items.map((skill) => ({
        ...skill,
        items: skill.items.filter(
          ({ level }) => level >= n || !level,
        ),
      })),
    )
  }
</script>

<div
  title={LevelType[$skillLevelFilterState]}
  class="flex fill-babyBlue-300"
>
  <p>
    nur Skills mit folgender Selbsteinschätzung (und höher)
    anzeigen
  </p>
  {#each skillLevels as n}
    <button on:click={() => setSkillsFilter(n)}>
      <Star
        size="48px"
        color="inherit"
        weight={$skillLevelFilterState < n
          ? 'light'
          : 'fill'}
      />
    </button>
  {/each}
</div>
