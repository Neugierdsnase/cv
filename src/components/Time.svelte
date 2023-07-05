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
  <span>{from.format(DATE_FORMAT)}</span>
{:else}
  {#if !to}<span
      >{getIntlContent(since, $contentLangState)}</span
    >{/if}
  <span>{from.format(DATE_FORMAT)}</span>
  {#if to}<span>{` - ${to.format(DATE_FORMAT)}`}</span>{/if}
{/if}
