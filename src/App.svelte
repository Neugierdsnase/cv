<script lang="ts">
  import {
    CvItemsType,
    SkillGroup,
    UnstructuredSection,
  } from './types'
  import './app.css'
  import Hero from './components/Hero.svelte'
  import Main from './components/Main.svelte'

  export let data: {
    cvJobItems: CvItemsType
    cvEduItems: CvItemsType
    skills: SkillGroup
    misc: UnstructuredSection
  }
</script>

<Hero />
<Main {...data} />
