<script lang="ts">
  import { getIntlContent } from './../../utility'
  import { CvSectionType } from './../../types/index'
  import SkillList from './SkillList.svelte'
  import { contentLangState } from '../../stores/ui'

  export let skill: CvSectionType
  const { heading, items } = skill
</script>

{#if items && items.length}
  <section
    class="min-w-[40%] grow print:break-inside-avoid"
  >
    <h2
      class="ml-8 text-2xl font-bold print:!text-lg print:!font-normal"
    >
      {@html getIntlContent(heading, $contentLangState)}
    </h2>
    <SkillList {items} />
  </section>
{/if}
