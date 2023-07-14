<script>
  import { contentLangState } from '../stores/ui'
  import { contactMe, email, linkedIn } from '../ui-text'
  import { getIntlContent } from './../utility.ts'
</script>

<footer
  class="footer footer-center mt-8 bg-base-300 p-8 text-base-content print:bg-white print:text-black"
>
  <p class="mx-auto">
    {getIntlContent(contactMe, $contentLangState)}
    <a href="mailto:mail@vomkonstant.in"
      >mail@vomkonstant.in</a
    >
    <a
      class="print:hidden"
      href="https://www.linkedin.com/in/konstantin-kovar-5301494b/"
      >{getIntlContent(linkedIn, $contentLangState)}</a
    >
  </p>
</footer>
