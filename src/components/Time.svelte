<script lang="ts">
  import { DATE_FORMAT } from '../constants'
  import dayjs from 'dayjs'

  import { TimeType } from '../types'
  import { getIntlContent } from '../utility'
  import { since } from '../ui-text'
  import { contentLangState } from '../stores/ui'
  export let time: TimeType
  const { to, from } = time
</script>

{#if dayjs(to).isSame(from)}
  <span class="print:text-sm"
    >{from.format(DATE_FORMAT)}</span
  >
{:else}
  {#if !to}<span class="print:text-sm"
      >{getIntlContent(since, $contentLangState)}</span
    >{/if}
  <span class="print:text-sm"
    >{from.format(DATE_FORMAT)}</span
  >
  {#if to}<span class="print:text-sm"
      >{` - ${to.format(DATE_FORMAT)}`}</span
    >{/if}
{/if}
