<script lang="ts">
  import { DATE_FORMAT } from '../../constants'
  import dayjs from 'dayjs'

  import { TimeType } from '../../types'
  export let time: TimeType
  const { to, from } = time
</script>

<div
  class="font-cover absolute top-4 right-4 w-1/4 rotate-90 text-2xl font-bold opacity-60 print:static print:rotate-0 md:rotate-0 md:text-right"
>
  {#if dayjs(to).isSame(from)}
    <span>{from.format(DATE_FORMAT)}</span>
  {:else}
    {#if !to}<span>{`seit `}</span>{/if}
    <span>{from.format(DATE_FORMAT)}</span>
    {#if to}<span>{` - ${to.format(DATE_FORMAT)}`}</span
      >{/if}
  {/if}
</div>
