<script lang="ts">
  import Skills from './Skills/Skills.svelte'
  import { CvItemsType, SkillGroup, Tag, UnstructuredSection } from '../types'
  import CvItems from './CvItems/CvItems.svelte'

  export let cvJobItems: CvItemsType
  export let cvEduItems: CvItemsType
  export let skills: SkillGroup
  export let misc: UnstructuredSection

  let show: Tag[] = []
  let hide: Tag
  let showOnly: Tag

  const filterData = () => {
    if (showOnly) {
      return
    }

    if (hide) {
      return
    }

    if (show && show.length) {
      return
    }
  }
</script>

<main class="my-8 px-4">
  <CvItems cvItems={cvJobItems} />
  <CvItems cvItems={cvEduItems} />
  <Skills {skills} />
</main>
