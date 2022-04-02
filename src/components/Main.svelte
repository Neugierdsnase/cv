<script lang="ts">
  import Skills from './Skills/Skills.svelte'
  import CvItems from './CvItems/CvItems.svelte'
  import {
    cvEduItemsState,
    cvJobItemsState,
    miscState,
    skillsState,
  } from '../stores/data'
  import FilterButton from './Buttons/FilterButton.svelte'
  import PdfButton from './Buttons/PdfButton.svelte'
  import FilterSidebar from './FilterSidebar.svelte'
</script>

<main class="my-8 px-4">
  <CvItems cvItems={$cvJobItemsState} />
  <CvItems cvItems={$cvEduItemsState} />
  <Skills skills={$skillsState} />
  <FilterSidebar />
  <div
    class="fixed right-16 bottom-0 z-50 flex h-1/3 flex-col justify-around align-middle print:hidden"
  >
    <FilterButton />
    <PdfButton />
  </div>
</main>
