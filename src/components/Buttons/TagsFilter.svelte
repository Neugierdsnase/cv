<script lang="ts">
  import { ALL_TAGS } from '../../constants'
  import Tag from '../Tag.svelte'

  // export let show = false
</script>

<div class="flex flex-wrap gap-2">
  {#each ALL_TAGS as tag}
    <Tag size="m" {tag} />
  {/each}
</div>
