<script lang="ts">
  import { allTags } from '../../constants'
  import Tag from '../Tag.svelte'

  // export let show = false
</script>

<div class="flex flex-wrap gap-2">
  {#each allTags as tag}
    <Tag size="m" {tag} />
  {/each}
</div>
