<script lang="ts">
  export let tag: string
  // TODO: onclick: filter by tag
</script>

<li class="mr-2 bg-babyBlue-300 py-1 px-4 lg:mb-4">
  <span class="text-xs font-bold text-black-rich">
    {@html tag}
  </span>
</li>
