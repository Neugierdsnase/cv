<script lang="ts">
  import './app.css'
  import FilterSidebar from './components/FilterSidebar.svelte'
  import Footer from './components/Footer.svelte'
  import Hero from './components/Hero.svelte'
  import Main from './components/Main.svelte'
  import { showSidebarState } from './stores/ui'
  import '@phosphor-icons/web/bold'
  import 'gutenberg-css'
  let y: number
</script>

<svelte:window bind:scrollY={y} />

<Hero />
<div>
  <Main />
  <Footer />
</div>
<FilterSidebar />
<div
  class="fixed bottom-0 right-12 z-20 flex h-1/5 flex-col justify-around align-middle print:hidden"
>
  <button
    on:click={() => showSidebarState.set(true)}
    class="btn-primary btn-outline btn h-12 w-12 rounded-full text-xl"
  >
    <i class="ph-bold ph-funnel-simple" />
  </button>
  <button
    class="btn-primary btn-outline btn h-12 w-12 rounded-full text-xl"
    on:click={() => window.print()}
  >
    <i class="ph-bold ph-file-pdf" />
  </button>
</div>
