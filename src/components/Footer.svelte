<script>
  import { contentLangState } from '../stores/ui'
  import { contactMe, email, linkedIn } from '../ui-text'
  import { getIntlContent } from './../utility.ts'
</script>

<footer class="mt-16 flex flex-col items-center py-8 px-8">
  <p class="mx-auto">
    {getIntlContent(contactMe, $contentLangState)}
  </p>
  <div class="flex justify-around">
    <span>
      {`${getIntlContent(email, $contentLangState)}: `}
      <a href="mailto:mail@vomkonstant.in"
        >mail@vomkonstant.in</a
      >
    </span>
    <span class="print:hidden">{` || `}</span>
    <span class="print:hidden">
      <a
        href="https://www.linkedin.com/in/konstantin-kovar-5301494b/"
        >{getIntlContent(linkedIn, $contentLangState)}</a
      >
    </span>
  </div>
</footer>
