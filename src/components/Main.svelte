<script lang="ts">
  import Skills from './Skills/Skills.svelte'
  import CvItems from './CvItems/CvItems.svelte'
  import {
    cvEduItemsState,
    cvJobItemsState,
    miscState,
    skillsState,
  } from '../stores/data'
</script>

<main class="my-8 px-4">
  <CvItems cvItems={$cvJobItemsState} />
  <CvItems cvItems={$cvEduItemsState} />
  <Skills skills={$skillsState} />
</main>
