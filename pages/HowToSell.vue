<template>
  <div class="text-wrap">
    <div class="container">
      <h1 class="font-bold title">
        Sådan sælger du
      </h1>

      <h3 class="font-bold">
        Prisgaranti
      </h3>
      <p class="text">
        Vi slår alle andre firmaers opkøbspriser på nettet. Butikkerne vurderer prisen på dit produkt baseret på standen.
      </p>

      <h3 class="font-bold">
        Nemt og smart
      </h3>

      <p class="text">
        Vi renser, nulstiller og sletter dine data, så e-mails, private billeder og videoer ikke ender i de forkerte hænder. Du handler udelukkende med GreenMind A/S og vi behandler alle dine oplysninger fortroligt.
      </p>

      <h3 class="font-bold">
        Inden du kommer ned i butikken
      </h3>

      <ul class="list-disc">
        <li class="text">
          Produktet skal være opladet. Hvis det er en mobil, tablet, bærbar eller lignende der bruger batteri, skal du sørge for at produktet er opladet, så personalet kan tjekke udstyrets stand.
        </li>
        <li class="text">
          Medbring ID gyldig billede- og adresselegitimation. Alle som sælger til GreenMind A/S bliver registreret i vores system for at sikre at du er den retmæssige ejer.
        </li>
        <li class="text">
          Medbring alt ekstraudstyr for at opnå den bedste pris. Produktet er mere værd hvis du også husker at medbringe originalt ekstraudstyr, såsom oplader, controller osv.
        </li>
      </ul>

      <h3 class="font-bold">
        I butikken
      </h3>
      <p class="text">
        Personalet vurderer produktet og giver dig en pris
      </p>
      <ul class="list-disc">
        <li class="text">
          Jo bedre stand produktet er i, jo bedre pris får du.
        </li>
        <li class="text">
          Ønsker du at købe et andet produkt i vores butik eller onlineshop, kan vi give dig en endnu bedre pris for dit produkt.
        </li>
        <li class="text">
          Når du accepterer prisen, er handlen bindende for begge parter. Vi forbeholder os dog retten til at ophæve handlen såfremt det viser sig, at varen ikke tilhører dig, eller hvis varen har en ikke uvæsentlig defekt eller skade, som du ikke oplyste os om, forud for salget.
        </li>
        <li class="text">
          Bemærk at personalet til enhver tid kan afvise at købe en vare.
        </li>
        <li class="text">
          Herefter kan du enten bruge beløbet i butikken, onlineshoppen eller få pengene udbetalt til din NemKonto.
        </li>
      </ul>

      <nuxt-link :to="{ name: 'shops' }" class="underline text-center y-link">
        Find butik
      </nuxt-link>

      <h3 class="font-bold">
        Virksomheder
      </h3>
      <p class="text italic">
        Er I en virksomhed med mere end 10 enheder i vil sælge?
      </p>
      <ul class="list-disc">
        <li class="text">
          Ved at sælge til GreenMind A/S, sørger vi for at jeres virksomhed er i compliance med GDPR-lovgivningen, da datasletning, altid er indeholdt i vores priser.
        </li>
        <li class="text">
          Såfremt I vælger at lade jeres medarbejdere beholde udgåede enheder, er det stadig vigtigt, at få dokumentation/certifikat på at jeres enheder er dataslettet, så i til enhver tid kan dokumentere at i har behandlet fortrolige/personfølsomme oplysninger efter lovgivningen.
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '~/assets/css/infoPages.scss';
</style>
