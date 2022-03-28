<script lang="ts">
  export let tag: string;
  // TODO: onclick: filter by tag
</script>

<li class="bg-babyBlue-300 py-1 px-4 mr-2 lg:mb-4">
  <span class="text-black-rich text-xs font-bold">
    {@html tag}
  </span>
</li>