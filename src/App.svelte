<script lang="ts">
  import './app.css'
  import FilterButton from './components/Buttons/FilterButton.svelte'
  import PdfButton from './components/Buttons/PdfButton.svelte'
  import FilterSidebar from './components/FilterSidebar.svelte'
  import Hero from './components/Hero.svelte'
  import Intro from './components/Intro.svelte'
  import Main from './components/Main.svelte'
  import { SCROLL_OFFSET } from './constants'
  let y: number
</script>

<svelte:window bind:scrollY={y} />

<Hero />
<div
  style={y < SCROLL_OFFSET
    ? `transform: translateY(${y}px);`
    : `transform: translateY(${SCROLL_OFFSET}px);`}
>
  <Intro />
  <Main />
</div>
<FilterSidebar />
<div
  class="fixed right-16 bottom-0 z-50 flex h-1/3 flex-col justify-around align-middle print:hidden"
>
  <FilterButton />
  <PdfButton />
</div>
