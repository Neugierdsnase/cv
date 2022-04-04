<script lang="ts">
  import './app.css'
  import FilterButton from './components/Buttons/FilterButton.svelte'
  import PdfButton from './components/Buttons/PdfButton.svelte'
  import TranslateButton from './components/Buttons/TranslateButton.svelte'
  import FilterSidebar from './components/FilterSidebar.svelte'
  import Footer from './components/Footer.svelte'
  import Hero from './components/Hero.svelte'
  import Intro from './components/Intro.svelte'
  import Main from './components/Main.svelte'
  import { SCROLL_OFFSET } from './constants'
  import data from './data'
  let y: number
</script>

<svelte:window bind:scrollY={y} />

<Hero />
<div
  class="print-transform-reset px-8 transition-transform delay-75 print:p-0 md:px-12 lg:px-32"
  style={y < SCROLL_OFFSET
    ? `transform: translateY(${y}px);`
    : `transform: translateY(${SCROLL_OFFSET}px);`}
>
  <Intro text={data.introText} />
  <Main />
  <Footer />
</div>
<FilterSidebar />
<div
  class="fixed right-12 bottom-0 z-20 flex h-1/4 flex-col justify-around align-middle print:hidden"
>
  <FilterButton />
  <TranslateButton />
  <PdfButton />
</div>
