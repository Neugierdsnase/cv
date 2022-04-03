<script lang="ts">
  import NonTechFilter from './Buttons/NonTechFilter.svelte'
  import { clickOutside } from './../utility'
  import clsx from 'clsx'
  import { showSidebar } from '../stores/ui'
  import SkilllevelFilter from './Buttons/SkilllevelFilter.svelte'
  import TagsFilter from './Buttons/TagsFilter.svelte'
</script>

<div
  use:clickOutside
  on:outsideClick={() => showSidebar.set(false)}
  class={clsx(
    'fixed',
    'bottom-0',
    'top-0',
    'w-80',
    'h-screen',
    'right-0',
    'z-40',
    'flex',
    'flex-col',
    'p-8',
    'bg-black-dark',
    'transition-transform',
    'rounded-l-md',
    !$showSidebar && 'translate-x-80',
  )}
>
  <div class="flex h-2/3 flex-col justify-between">
    <TagsFilter />
    <SkilllevelFilter />
    <NonTechFilter />
  </div>
</div>
