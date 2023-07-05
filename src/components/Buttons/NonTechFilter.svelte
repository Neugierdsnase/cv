<script lang="ts">
  import {
    activeFiltersState,
    filterData,
    hideNonTechState,
  } from '../../stores/filters'
  import { contentLangState } from '../../stores/ui'
  import { nonTechFilterLabel } from '../../ui-text'
  import { getIntlContent } from '../../utility'

  const handleClick = () => {
    hideNonTechState.update((s) => !s)
    filterData($activeFiltersState, $hideNonTechState)
  }
</script>

<label class="label cursor-pointer">
  <input
    type="checkbox"
    name="hideNonTechState"
    bind:checked={$hideNonTechState}
    on:click={handleClick}
    class="toggle-primary toggle"
  />
  <span class="label-text">
    {getIntlContent(nonTechFilterLabel, $contentLangState)}
  </span>
</label>
