<script lang="ts">
  import { CvItemType } from '../../types'

  import Time from '../Time.svelte'
  import { getIntlContent } from '../../utility'
  import {
    contentLangState,
    openModalWithValues,
  } from '../../stores/ui'
  import Tag from '../Buttons/Tag.svelte'

  export let cvItem: CvItemType

  let { label, time, tagLine, list, tags } = cvItem
</script>

<article
  class="relative z-10 mx-4 rounded-xl bg-base-100 p-8 print:hidden lg:mx-0"
>
  <div class="flex flex-col">
    <div class="flex flex-col lg:flex-row">
      {#if tags}
        <ul
          class="flex h-10 flex-row items-stretch overflow-x-scroll border-primary pr-4 lg:mr-8 lg:h-auto lg:flex-col lg:overflow-x-hidden lg:border-r-4 lg:pr-8"
        >
          {#each tags as tag}
            <li>
              <Tag {tag} />
            </li>
          {/each}
        </ul>
      {/if}

      <div class="relative mt-4 flex w-full flex-col">
        <h3 class="h3 w-2/3 font-bold leading-none">
          {@html getIntlContent(label, $contentLangState)}
        </h3>
        <div
          class="absolute right-4 top-4 w-1/4 rotate-90 text-2xl font-bold opacity-60 print:static print:rotate-0 md:rotate-0 md:text-right"
        >
          <Time {time} />
        </div>
        {#if Boolean(tagLine)}
          <p class="font-cover  w-2/3">
            {@html getIntlContent(
              tagLine,
              $contentLangState,
            )}
          </p>
        {/if}
      </div>
    </div>

    {#if list && list.length}
      <button
        on:click={() =>
          openModalWithValues({
            list,
            heading: getIntlContent(
              label,
              $contentLangState,
            ),
            tags,
            time,
          })}
        class="btn-primary btn-outline btn mb-0 mt-8 max-w-xs lg:ml-auto"
      >
        Details
      </button>
    {/if}
  </div>
</article>

<!-- Print version -->
<div class="mt-4 hidden break-inside-avoid print:block">
  <h3 class="font-cover text-lg font-bold">
    {@html getIntlContent(label, $contentLangState)}
  </h3>
  {#if Boolean(tagLine)}
    <p class="text-md">
      {@html getIntlContent(tagLine, $contentLangState)}
    </p>
  {/if}
  <Time {time} />
  {#if list && list.length}
    <ul class="list-inside list-disc py-4">
      {#each list as listItem}
        <li class="list-item text-sm">
          <span
            >{@html getIntlContent(
              listItem.label,
              $contentLangState,
            )}
          </span>
        </li>
      {/each}
    </ul>
  {/if}
</div>
