<script lang="ts">
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
    'right-0',
    'z-40',
    'flex',
    'flex-col',
    'p-8',
    'bg-red-500',
    !$showSidebar && 'translate-x-80',
  )}
>
  <TagsFilter />
  <SkilllevelFilter />
</div>
