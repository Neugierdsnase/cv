<script lang="ts">
  import { TagType } from '../../types'

  import Tag from '../Tag.svelte'

  export let tag: TagType
</script>

<li class="lg:mb-4">
  <Tag size="m" {tag} />
</li>
