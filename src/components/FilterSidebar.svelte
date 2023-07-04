<script lang="ts">
  import NonTechFilter from './Buttons/NonTechFilter.svelte'
  import { clickOutside } from './../utility'
  import { showSidebarState } from '../stores/ui'
  import SkilllevelFilter from './Buttons/SkilllevelFilter.svelte'
  import TagsFilter from './Buttons/TagsFilter.svelte'
</script>

<div
  use:clickOutside
  on:outsideClick={() => showSidebarState.set(false)}
  class="fixed bottom-0 right-0 top-0 z-40 flex h-screen w-80 flex-col rounded-l-md bg-black-dark p-8 transition-transform"
  class:translate-x-80={!showSidebarState}
>
  <div class="flex h-2/3 flex-col justify-between">
    <TagsFilter />
    <SkilllevelFilter />
    <NonTechFilter />
  </div>
</div>
