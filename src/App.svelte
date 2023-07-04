<script lang="ts">
  import './app.css'
  import FilterSidebar from './components/FilterSidebar.svelte'
  import Footer from './components/Footer.svelte'
  import Hero from './components/Hero.svelte'
  import Intro from './components/Intro.svelte'
  import Main from './components/Main.svelte'
  import data from './data'
  import { contentLangState } from './stores/ui'
  import '@phosphor-icons/web/fill'
  import '@phosphor-icons/web/light'
  import '@phosphor-icons/web/bold'
  let y: number
</script>

<svelte:window bind:scrollY={y} />

<Hero />
<div>
  <Intro text={data.introText} />
  <Main />
  <Footer />
</div>
<FilterSidebar />
<div
  class="fixed bottom-0 right-12 z-20 flex h-2/5 flex-col justify-around align-middle print:hidden"
>
  <button>
    <i class="ph-bold ph-funnel-simple" />
  </button>
  <button
    on:click={() =>
      contentLangState.update((s) =>
        s === 'de' ? 'en' : 'de',
      )}
  >
    <i class="ph-bold ph-file-pdf" />
  </button>
  <button on:click={window.print}>
    <i class="ph-bold ph-printer" />
  </button>
</div>
