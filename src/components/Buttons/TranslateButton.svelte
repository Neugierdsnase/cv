<script lang="ts">
  import { Translate } from 'phosphor-svelte'
  import { contentLangState } from '../../stores/ui'
  import { language } from '../../ui-text'
  import { getIntlContent } from '../../utility'
  import ButtonContainer from './ButtonContainer.svelte'

  export let showText: true | undefined = undefined
</script>

<ButtonContainer
  onClick={() =>
    contentLangState.update((s) =>
      s === 'de' ? 'en' : 'de',
    )}
>
  {#if showText}
    <span class="text-sm"
      >{getIntlContent(language, $contentLangState)}</span
    >
  {:else}
    <Translate size="36px" /> :
  {/if}
</ButtonContainer>
