<script lang="ts">
  import { FilePdf } from 'phosphor-svelte'
  import ButtonContainer from './ButtonContainer.svelte'
</script>

<ButtonContainer onClick={window.print}>
  <FilePdf size="36px" />
</ButtonContainer>
