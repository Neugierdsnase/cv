<script lang="ts">
  import clsx from 'clsx'
  import { contentLangState } from '../../stores/ui'
  import { ListItemType } from '../../types'
  import { getIntlContent } from '../../utility'
  export let listItem: ListItemType
  export let index: number
  export let show: boolean
</script>

<li
  class={clsx(
    `flex items-center border-t-0 border-babyBlue-300 px-2 custom-delay-${index} h-0 overflow-hidden transition-all print:h-6 print:border-0 print:border-slate-500 print:bg-transparent`,
    show && 'h-12 border-t-2',
  )}
>
  <p class="text-sm">
    {@html getIntlContent(
      listItem.label,
      $contentLangState,
    )}
  </p>
</li>
