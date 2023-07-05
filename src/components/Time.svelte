<script lang="ts">
  import {
    DATE_FORMAT,
    DETAILED_DATE_FORMAT,
  } from '../constants'
  import dayjs from 'dayjs'

  import { TimeType } from '../types'
  import { getIntlContent } from '../utility'
  import { since } from '../ui-text'
  import { contentLangState } from '../stores/ui'
  export let time: TimeType
  const { to, from } = time
  export let detailed = false

  $: timeFormat = detailed
    ? DETAILED_DATE_FORMAT
    : DATE_FORMAT
</script>

{#if dayjs(to).isSame(from)}
  <span>{from.format(timeFormat)}</span>
{:else}
  {#if !to}<span
      >{getIntlContent(since, $contentLangState)}</span
    >{/if}
  <span>{from.format(timeFormat)}</span>
  {#if to}<span>{` - ${to.format(timeFormat)}`}</span>{/if}
{/if}
