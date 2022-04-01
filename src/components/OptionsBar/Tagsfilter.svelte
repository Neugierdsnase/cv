<script lang="ts">
  import { TagType } from '../../types'
  import Tag from '../Tag.svelte'

  const allTags: TagType[] = [
    'frontend',
    'backend',
    'devops/sre',
    'tech health/monitoring',
    'consulting',
    'other',
    'non&#8209;tech',
  ]
</script>

<div class="bg-slate-600 p-4">
  {#each allTags as tag}
    <Tag size="m" {tag} />
  {/each}
</div>
