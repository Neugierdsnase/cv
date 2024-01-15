<script lang="ts">
  import { CvItemType } from '../../types'
  import SkillListItem from './SkillListItem.svelte'

  export let items: CvItemType[]
</script>

<div class="px-8 print:flex print:flex-wrap">
  {#each items as item}
    <dl
      class="flex items-center justify-between rounded-lg px-2 py-1 odd:bg-primary/20 print:mx-1 print:w-1/4 print:break-inside-avoid print:rounded-none print:!bg-white print:!p-0"
    >
      <SkillListItem {item} />
    </dl>
  {/each}
</div>
