<script lang="ts">
  import { ALL_TAGS } from '../../constants'
  import Tag from '../Tag.svelte'

  // export let show = false
</script>

<div class="flex flex-wrap gap-2">
  <p>nach Schlagworten filtern</p>
  {#each ALL_TAGS as tag}
    <Tag size="m" {tag} />
  {/each}
</div>
