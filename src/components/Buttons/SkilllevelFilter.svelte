<script lang="ts">
  import { Star } from 'phosphor-svelte'
  import data from '../../data'
  import { skillsState } from '../../stores/data'
  import { skillLevelFilterState } from '../../stores/filters'
  import { contentLangState } from '../../stores/ui'
  import { LevelType } from '../../types'
  import { skillLevelFilterLabel } from '../../ui-text'
  import { getIntlContent } from '../../utility'
  const skillLevels: LevelType[] = [1, 2, 3, 4, 5]

  const setSkillsFilter = (n: LevelType) => {
    skillLevelFilterState.set(n)
    skillsState.set({
      ...data.skills,
      items: data.skills.items.map((skill) => ({
        ...skill,
        items: skill.items.filter(
          ({ level }) => level >= n || !level,
        ),
      })),
    })
  }
</script>

<div>
  <p class="pb-4">
    {getIntlContent(
      skillLevelFilterLabel,
      $contentLangState,
    )}
  </p>
  <div
    title={LevelType[$skillLevelFilterState]}
    class="flex fill-babyBlue-300"
  >
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
</div>
