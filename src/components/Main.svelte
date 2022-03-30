<script lang="ts">
  import Skills from './Skills/Skills.svelte'
  import CvItems from './CvItems/CvItems.svelte'
  import { cvEduItems, cvJobItems, misc, skills } from '../stores/data'
  import { activeFilters } from '../stores/filters'

  const filterData = () => {
    cvJobItems.update((s) => {
      s.filterItems($activeFilters)

      return s
    })
  }
</script>

<main class="my-8 px-4">
  <CvItems cvItems={$cvJobItems} />
  <CvItems cvItems={$cvEduItems} />
  <Skills skills={$skills} />
</main>
