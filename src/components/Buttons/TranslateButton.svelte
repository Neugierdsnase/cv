<script lang="ts">
  import { Translate } from 'phosphor-svelte'
  import { contentLangState } from '../../stores/ui'
  import ButtonContainer from './ButtonContainer.svelte'
</script>

<ButtonContainer
  onClick={() =>
    contentLangState.update((s) =>
      s === 'de' ? 'en' : 'de',
    )}
>
  <Translate size="36px" />
</ButtonContainer>
