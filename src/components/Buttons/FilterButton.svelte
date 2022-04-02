<script lang="ts">
  import { update } from 'lodash'
  import { FunnelSimple } from 'phosphor-svelte'
  import { showSidebar } from '../../stores/ui'
  import ButtonContainer from './ButtonContainer.svelte'
</script>

<ButtonContainer
  onClick={() => showSidebar.update((s) => !s)}
>
  <FunnelSimple size="36px" />
</ButtonContainer>
