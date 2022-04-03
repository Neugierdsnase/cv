<div
  class="mt-20 mb-12 flex justify-end bg-babyBlue-300 p-8 print:hidden"
>
  <h2
    class="text-h2 text-right font-display font-bold text-babyBlue-400 print:text-left print:text-black-rich"
  >
    <slot />
  </h2>
</div>

<!-- Print version -->
<h2 class="hidden font-display text-2xl print:block">
  <slot />
</h2>
