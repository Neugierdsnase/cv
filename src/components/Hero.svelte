<script lang="ts">
  let y: number
</script>

<svelte:window bind:scrollY={y} />

<section id="hero" class="h-screen-2/3">
  <div
    class="hero-clip-path flex h-full w-full items-center justify-center"
  >
    <div>
      <h1 class="text-hero font-bold">
        {@html `Konstantin Kovar`}
      </h1>
    </div>
  </div>
</section>
<div
  class="sticky top-[40vh] -mt-[80vh] text-babyBlue-300"
  style={`${
    y > 300 ? `transform: translateY(-${y - 300}px);` : ''
  }`}
>
  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
  Veniam fugiat id facilis temporibus voluptates quod earum
  molestiae nisi architecto reprehenderit a libero, nulla
  repellendus labore eum ut nam culpa facere totam vero?
  Eius nulla vel enim, dicta pariatur quae blanditiis ut
  quas iure, quod deleniti tempore hic sapiente perferendis
  quos iusto. Vero dolorum odit excepturi at, voluptatum
  quas quia minima nisi beatae dolore! Culpa, dolores iusto,
  commodi amet exercitationem dicta quas vero voluptatibus
  odio placeat iste vel quae, enim voluptatum in aut tempora
  ut pariatur cumque possimus provident. Sapiente accusamus
  illo cumque temporibus voluptate architecto eum qui
  consequatur vel quaerat, placeat veritatis, commodi
  repellendus accusantium debitis quos consectetur magni
  corporis beatae corrupti vero voluptates doloremque. Ab
  odio hic quas, quibusdam ratione, totam quaerat ipsam
  fugit voluptatem maxime facilis quos mollitia cum itaque
  aliquid laborum nobis possimus porro quisquam ipsum quo.
  Architecto eveniet hic corrupti atque ea, impedit dolor
  error rem saepe tempora ipsam sed cum quibusdam deserunt
  deleniti ex ad a! Quis, debitis aspernatur harum quos et
  ipsam? Nisi amet officiis dicta quam quas quae fugit at
  soluta sint quis eaque odit, doloremque provident dolore
  atque nam sit perspiciatis illo! Magnam recusandae
  doloremque asperiores quos, sit deleniti, sunt pariatur
  voluptate tempore consequatur tenetur impedit illum.
  Quasi, distinctio officiis totam, sunt vitae commodi quae
  impedit, corrupti omnis odit maiores culpa laboriosam
  deleniti ad tempore? Ducimus sed ut illo, sequi fugiat,
  reprehenderit odio nemo perspiciatis mollitia, deserunt
  animi assumenda? Deserunt officia omnis porro quibusdam
  suscipit quis, explicabo a impedit dignissimos, est,
  aperiam quam facere maxime perspiciatis fuga officiis
  ullam quae inventore cum ipsa distinctio nam voluptatum
  atque. Consequuntur quas rem distinctio sequi temporibus!
  Distinctio, ut quod repellendus ipsam nemo quam, ad error
  totam eveniet cupiditate, fugiat pariatur nihil natus
  veniam. Neque repellendus consequuntur repellat quo
  suscipit alias porro, voluptatibus voluptatem hic facilis
  explicabo magnam! Exercitationem sapiente voluptate porro
  praesentium aspernatur quaerat enim, rem tempore iste
  omnis veniam soluta temporibus, explicabo consequuntur
  veritatis sequi qui accusamus est commodi, id amet natus
  ab? Modi deserunt, officiis reiciendis doloribus molestias
  dolor quidem. Illum, id fugit dolor facere accusamus vero
  ad quidem maiores ipsam magnam cupiditate dolorem maxime
  magni a veritatis! Fugiat rerum facilis, iure labore
  temporibus a saepe! A aliquid, quo obcaecati voluptatem
  cumque debitis blanditiis tenetur vero. Ab consectetur
  animi iste consequatur vitae. Nisi odit numquam hic culpa
  obcaecati accusantium perferendis deserunt eveniet eos
  harum fugit neque voluptatum similique cupiditate
  aspernatur, quod quae quia corrupti nihil nesciunt magnam
  consequuntur ex officia suscipit? Aperiam, blanditiis. Cum
  facilis quam accusantium vel accusamus amet, praesentium
  quod aperiam, eveniet quos laborum autem? Atque impedit
  omnis dolor unde at, esse non vitae expedita eveniet
  aspernatur debitis illo nihil iste quisquam libero
  blanditiis cupiditate inventore ut id eligendi voluptates
  soluta quam officia incidunt? Qui libero, dolorum eligendi
  tempora sint cumque aliquid provident ea, corrupti
  blanditiis itaque? Sed quas dicta voluptas dolores
  assumenda! Officia, nisi repellat? Alias illum rem,
  provident numquam quam consequatur temporibus excepturi
  cupiditate perspiciatis expedita, iure, officiis veritatis
  laborum aperiam facilis tempora. Consectetur vitae eius
  magni nam rerum!
</div>
