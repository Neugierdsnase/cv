<script lang="ts">
  import { FunnelSimple } from 'phosphor-svelte'
  import { showSidebarState } from '../../stores/ui'
  import ButtonContainer from './ButtonContainer.svelte'
</script>

<ButtonContainer
  onClick={() => showSidebarState.update((s) => !s)}
>
  <FunnelSimple size="36px" />
</ButtonContainer>
