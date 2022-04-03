<script lang="ts">
  import { CvItemType } from '../../types'
  import SkillListItem from './SkillListItem.svelte'

  export let items: CvItemType[]
</script>

{#each items as item}
  <dl
    class="flex items-center justify-between px-2 py-1 odd:bg-babyBlue-300 odd:bg-opacity-20 print:border-t-2 print:border-slate-400 print:bg-transparent print:first:border-0"
  >
    <SkillListItem {item} />
  </dl>
{/each}
