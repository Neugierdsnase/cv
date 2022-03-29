<script lang="ts">
  import clsx from 'clsx'
  import { ListItemType } from '../../types'
  export let listItem: ListItemType
  export let index: number
  export let show: boolean
</script>

<li
  class={clsx(
    `flex items-center border-t-0 border-babyBlue-300 px-2 custom-delay-${index} h-0 overflow-hidden transition-all`,
    show && 'h-12 border-t-2',
  )}
>
  <p class="text-sm">{@html listItem.label}</p>
</li>
