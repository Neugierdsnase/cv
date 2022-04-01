<script lang="ts">
  import clsx from 'clsx'
  import TagsFilter from './TagsFilter.svelte'
  import SkilllevelFilter from './SkilllevelFilter.svelte'

  let showFiltersBox = false
</script>

<div class="sticky bottom-0 left-0 bg-red-600 print:hidden">
  <div class={clsx(!showFiltersBox && 'hidden')}>
    <TagsFilter />
    <SkilllevelFilter />
  </div>
  <!-- <Print /> -->
</div>
