<script lang="ts">
  import SectionHeading from './../SectionHeading.svelte'
  import { SkillSectionType } from '../../types'
  import Legend from './Legend.svelte'

  import Skill from './Skill.svelte'
  import { getIntlContent } from '../../utility'
  import { contentLangState } from '../../stores/ui'

  export let skills: SkillSectionType
  $: items = skills.items
</script>

<div class="print:break-inside-avoid">
  {#if items && items.length}
    <SectionHeading>
      {@html getIntlContent(
        skills.heading,
        $contentLangState,
      )}
    </SectionHeading>
    <Legend />
    <div
      class="mx-auto flex flex-wrap gap-4 print:ml-4 print:w-full print:flex-col lg:w-2/3"
    >
      {#each items as skill (skill)}
        <Skill {skill} />
      {/each}
    </div>
  {/if}
</div>
