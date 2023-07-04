<script>
  import { contentLangState } from '../stores/ui'
  import { contactMe, email, linkedIn } from '../ui-text'
  import { getIntlContent } from './../utility.ts'
</script>

<footer
  class="footer footer-center bg-base-300 p-4 text-base-content"
>
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
