<script lang="ts">
  import {
    activeFiltersState,
    hideNonTechState,
    skillLevelFilterState,
  } from '../stores/filters'
  import { contentLangState } from '../stores/ui'
  import { subTitle } from '../ui-text'
  import { getIntlContent } from '../utility'

  let y: number
</script>

<svelte:window bind:scrollY={y} />

<section
  id="hero"
  class="fixed top-0 z-30 h-[105vh] w-full print:hidden"
  style={`transform: translateY(-${y}px);`}
>
  <div
    class="hero-clip-path flex h-full w-full items-center justify-center"
  >
    <button
      class="absolute right-6 top-6"
      on:click={() =>
        contentLangState.update((s) =>
          s === 'de' ? 'en' : 'de',
        )}
    >
      <i class="ph-bold ph-translate" />
    </button>
    <div class="flex flex-col items-start md:items-center">
      <h1 class="text-h1 mx-8 font-bold text-babyBlue-400">
        Konstantin Kovar
      </h1>
      <subtitle class="mx-8 text-2xl text-babyBlue-400">
        {@html getIntlContent(subTitle, $contentLangState)}
      </subtitle>
    </div>
  </div>
</section>

<!-- Print version -->
<section class="mt-8 hidden text-center print:block">
  <h1 class="text-5xl">Konstantin Kovar</h1>
  <subtitle class="text-3xl">
    {@html getIntlContent(subTitle, $contentLangState)}
  </subtitle>
  <div class="text-xs text-gray-400" />
  <p>
    Disclaimer: This document was generated from an
    intercative website and might not display the full
    content. Please visit <b
      >https://konstantin-kovar-cv.vercel.app"</b
    >
    to view the whole document.
  </p>
  {#if $activeFiltersState.length}
    <p>The following filters have been activated:</p>
    <ul>
      {#each $activeFiltersState as filter}
        <li>{filter}</li>
      {/each}
    </ul>
  {/if}

  {#if $skillLevelFilterState > 1}
    <p>
      Only skills with an assigned skill level of {$skillLevelFilterState}/5
      are being displayed.
    </p>
  {/if}

  {#if $hideNonTechState}
    <p>Non-tech items are being hidden.</p>
  {/if}
</section>
