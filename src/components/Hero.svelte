<script lang="ts">
  import {
    activeFiltersState,
    hideNonTechState,
    skillLevelFilterState,
  } from '../stores/filters'
  import { contentLangState } from '../stores/ui'
  import { subTitle } from '../ui-text'
  import { getIntlContent } from '../utility'
  import '@phosphor-icons/web/bold'

  let y = 0
</script>

<svelte:window bind:scrollY={y} />

<section class="relative">
  <div
    class="flex h-screen w-screen flex-col overflow-hidden bg-base-100 pt-[30vh] shadow-2xl print:hidden lg:justify-end lg:pt-0"
  >
    <button
      class="btn-secondary btn-outline btn absolute right-6 top-6 z-20 h-12 w-12 rounded-full text-xl text-white"
      on:click={() =>
        contentLangState.update((s) =>
          s === 'de' ? 'en' : 'de',
        )}
    >
      <i class="ph-bold ph-translate" />
    </button>
    <div
      class="ml-2 leading-[8rem] lg:px-32 lg:leading-[18rem]"
      style={`transform: translateY(${y / 6}px);`}
    >
      <h1 class="text-7xl lg:text-[20rem]">
        Konstantin<br />Kovar
      </h1>
      <subtitle class="text-3xl lg:text-[8rem]">
        {@html getIntlContent(subTitle, $contentLangState)}
      </subtitle>
    </div>
  </div>
</section>

<!-- Print version -->
<section class="mt-8 hidden text-center print:block">
  <h1 class="text-xl font-bold">Konstantin Kovar</h1>
  <subtitle class="text-lg font-bold">
    {@html getIntlContent(subTitle, $contentLangState)}
  </subtitle>
  <div class="text-xs text-gray-400" />
  <p class="text-xs">
    Disclaimer: This document was generated from an
    intercative website and might not display the full
    content. Please visit <b>https://cv.vomkonstant.in"</b>
    to view the whole document.
  </p>
  {#if $activeFiltersState.length}
    <p class="text-xs">
      The following filters have been activated:
    </p>
    <ul>
      {#each $activeFiltersState as filter}
        <li>{filter}</li>
      {/each}
    </ul>
  {/if}

  {#if $skillLevelFilterState > 1}
    <p class="text-xs">
      Only skills with an (self-assessed) skill level of {$skillLevelFilterState}/5
      are being displayed.
    </p>
  {/if}

  {#if $hideNonTechState}
    <p class="text-xs">Non-tech items are being hidden.</p>
  {/if}
</section>
