<script lang="ts">
  import {
    filterSkills,
    skillLevelFilterState,
  } from '../../stores/filters'
  import { contentLangState } from '../../stores/ui'
  import { LevelEnum } from '../../types'
  import { skillLevelFilterLabel } from '../../ui-text'
  import { getIntlContent } from '../../utility'
  const skillLevels: LevelEnum[] = [0, 1, 2, 3, 4]
</script>

<div>
  <p class="pb-4">
    {getIntlContent(
      skillLevelFilterLabel,
      $contentLangState,
    )}
  </p>
  <div
    title={LevelEnum[$skillLevelFilterState]}
    class="flex"
  >
    {#each skillLevels as n}
      <button on:click={() => filterSkills(n)}>
        <i
          class="ph-star"
          class:ph-light={$skillLevelFilterState < n}
          class:ph-fill={$skillLevelFilterState >= n}
        />
      </button>
    {/each}
  </div>
</div>
