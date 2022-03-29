<script lang="ts">
  import { CvItemsType } from '../types/CvItemType'
  import CvItems from './CvItems/CvItems.svelte'

  export let cvJobItems: CvItemsType
  export let cvEduItems: CvItemsType
</script>

<main class="my-8 px-4">
  <CvItems cvItems={cvJobItems} />
  <CvItems cvItems={cvEduItems} />
</main>
