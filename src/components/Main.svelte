<script lang="ts">
  import {
    cvEduItemsState,
    cvJobItemsState,
    skillsState,
  } from '../stores/data'
  import CvItems from './CvItems/CvItems.svelte'
  import Skills from './Skills/Skills.svelte'
  import { showModalState } from '../stores/ui'
  import DetailsModal from './DetailsModal.svelte'
</script>

<main class="container print:w-full">
  <CvItems cvItems={$cvJobItemsState} />
  <CvItems cvItems={$cvEduItemsState} />
  <Skills skills={$skillsState} />
</main>

{#if $showModalState !== undefined}
  <DetailsModal />
{/if}
