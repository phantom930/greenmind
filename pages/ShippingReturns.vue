<template>
  <div class="text-wrap">
    <div class="container">
      <h1 class="font-bold title">
        Returnering
      </h1>

      <h3 class="font-bold subtitle">
        Fortrydelsesret
      </h3>
      <p class="text">
        Som forbruger har du har 14 dages fortrydelsesret, når du handler hos os. Fortrydelsesfristen udløber 14 dage efter den dag, du har modtaget din vare. Hvis du har bestilt flere forskellige varer i samme køb, men de leveres enkelvist, løber fristen fra den dag, hvor du modtager den sidste vare. Fristen indebærer, at du har 14 dage fra modtagelsen til at give os besked om, at du vil fortryde dit køb. Ønsker du at fortryde dit køb skal du sende en mail til
        <a href="mailto: mail@greenmind.dk">
          mail@greenmind.dk
        </a>.
      </p>
      <p class="text">
        Du kan ikke fortryde købet ved at nægte at modtage varen uden samtidig at give os besked.
      </p>

      <h3 class="font-bold subtitle">
        Fortrydelse af en del af købet
      </h3>
      <p class="text">
        Hvis du har købt flere varer hos os, har du mulighed for at sende én eller flere varer retur, selvom de er købt i én ordre.
      </p>

      <h3 class="font-bold subtitle">
        Returnering
      </h3>
      <p class="text">
        Når du har givet os besked om, at du vil fortryde dit køb, har du 14 dage til at sende varen tilbage til os. Du skal selv betale for at pakken returneres, og det er dig, der hæfter, hvis der opstår en skade under transporten.
      </p>

      <h3 class="font-bold subtitle">
        Varens stand, når du sender retur
      </h3>
      <p class="text">
        Hvis varen har mistet værdi, og det skyldes at du har brugt den på en anden måde, end hvad der var nødvendigt for at fastslå varens art, egenskaber og den måde, den fungerer, kan du kun få en del af købsbeløbet tilbage. Beløbet du kan få tilbage afhænger af varens handelsmæssige værdi, og i visse tilfælde kan det betyde, at du kun kan få fragtomkostningerne tilbage.
      </p>

      <h3 class="font-bold subtitle">
        Tilbagebetaling af købsbeløbet
      </h3>
      <p class="text">
        Hvis du fortryder dit køb, får du dine penge tilbage. Hvis varen er værdiforringet, fratrækker vi det beløb, du hæfter for. Vi refunderer betalinger modtaget fra dig, eksl. leveringsomkostninger, senest 14 dage fra den dag, hvor vi har modtaget din besked om, at du vil fortryde aftalen. Vi tilbagefører pengene med samme betalingsmiddel, som du benyttede ved købet, medmindre vi har aftalt andet. Vi kan tilbageholde betalingen indtil vi har modtaget varen, medmindre du sender os dokumentation for at have returneret den.
      </p>

      <p class="text">
        Varen sendes til: Den adresse der fremgår af din købskvittering.
      </p>
      <p class="text">
        Eller du kan indlevere varen i én af vores mange butikker:<br>
        <nuxt-link
          :to="{ name: 'shops' }"
          class="underline text-center y-link"
          title="Find butik"
        >
          Find butik
        </nuxt-link>
      </p>
      <p class="text">
        Vi modtager kun pakker, som sendes direkte til vores adresser. Du kan også fortryde købet ved at give os besked og aflevere den personligt i en af vores butikker.
      </p>

      <h3 class="font-bold subtitle">
        Reklamation
      </h3>
      <p class="text">
        Når du handler hos os som forbruger, gælder købelovens regler for varekøb. Det betyder, at du har reklamationsret i 24 måneder. Kontakt os altid inden du sender en vare. Hvis din reklamation er berettiget, betyder det, at du enten kan få varen repareret, ombyttet, pengene tilbage eller et afslag i prisen, afhængig af den konkrete situation.
      </p>
      <p class="text">
        Du skal reklamere inden for ”rimelig tid” efter, at du har opdaget fejlen. Hvis du reklamerer inden for to måneder efter, at fejlen er opdaget, vil reklamationen altid være rettidig.
      </p>
      <p class="text">
        Ved reklamation af vare, kontakt venligst vores kundeservice, for at få tilsendt en gratis returlabel. Varen skal altid sendes tilbage i forsvarlig emballage.<br>
        <nuxt-link
          :to="{ name: 'customer-service' }"
          class="underline text-center y-link"
          title="Kontakt kundeservice"
        >
          Kontakt kundeservice
        </nuxt-link><br>
      </p>
      <p class="text">
        Varen sendes til: Den adresse der fremgår af din købskvittering.
      </p>
      <p class="text">
        Eller du kan indlevere varen i én af vores mange butikker:<br>
        <nuxt-link
          :to="{ name: 'shops' }"
          class="underline text-center y-link"
          title="Find butik"
        >
          Find butik
        </nuxt-link>
      </p>
      <p class="text">
        Vi modtager kun pakker, som sendes direkte til vores adresser. Du kan også fortryde købet ved at give os besked og aflevere den personligt i en af vores butikker.<br>
        <nuxt-link
          :to="{ name: 'shops' }"
          class="underline text-center y-link"
          title="Find butik"
        >
          Find butik
        </nuxt-link>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '~/assets/css/infoPages.scss';
</style>
