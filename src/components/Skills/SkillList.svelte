<script lang="ts">
  import { CvItemType } from '../../types'
  import SkillListItem from './SkillListItem.svelte'

  export let items: CvItemType[]
</script>

<div class="px-8 print:flex print:flex-wrap">
  {#each items as item, index}
    <dl
      class="flex items-center justify-between rounded-lg px-2 py-1 odd:bg-primary/20 print:mx-1 print:w-1/4 print:break-inside-avoid print:border-t-2 print:border-gray-300 print:bg-transparent print:first:border-0"
    >
      <SkillListItem {item} />
    </dl>
  {/each}
</div>
