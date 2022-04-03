<script lang="ts">
  import {
    cvEduItemsState,
    cvJobItemsState,
    skillsState,
  } from '../stores/data'
  import CvItems from './CvItems/CvItems.svelte'
  import Skills from './Skills/Skills.svelte'
</script>

<main>
  <CvItems cvItems={$cvJobItemsState} />
  <CvItems cvItems={$cvEduItemsState} />
  <Skills skills={$skillsState} />
</main>
