<template>
  <div class="text-wrap">
    <div class="container">
      <h1 class="font-bold title mb">
        Reparation
      </h1>
      <p class="text mb">
        Find en butik nær dig og få din telefon repareret i dag. Hos GreenMind ønsker vi at være de førende inden for både reparationer og salg af brugte smartphones, tablets og computere. For at være det, er det afgørende, at vi kan være så tæt på vores kunder som overhovedet muligt. Derfor har vi i dag butikker fordelt over hele landet. Som kunde skal du som regel ikke vente længe på, at vi reparerer din enhed. Mens du venter, sørger vi for en behagelig atmosfære i vores butikker, hvor du samtidig finder et stort udvalg af brugt elektronik. Hvis du er i tvivl om, hvad der er galt med din telefon, så kan vores medarbejdere også hurtigt hjælpe dig. Det tager os som regel ikke lang tid at finde ud, hvad der skal gøres og komme med en eventuel pris.<br>
        <nuxt-link :to="{ name: 'shops' }" class="underline text-center y-link">
          FIND DIN NÆRMESTE GREENMIND AFDELING
        </nuxt-link>
      </p>
      <h3 class="font-bold subtitle mb text-center">
        GreenMind afdelinger
      </h3>
      <p class="text mb text-center">
        Vi har værksteder i alle vores butikker<br>
        Hvis vi ikke har travlt når du kommer, kan du få repareret din enhed mens du venter<br>
        Danmarks mest erfarne<br>
        Over 250.000 reparationer siden 2009<br>
        Hurtig service<br>
        Reparation på timebasis i alle butikker<br>
        Kvalitet i højsædet<br>
        Kun de bedste reservedele<br>
        Overtagelse af garanti<br>
        Vi overtager evt. rest-garanti på enhed
      </p>
      <h3 class="font-bold">
        Overtagelse af garanti og reklamationsret
      </h3>
      <p class="text mb">
        Når du får repareret din smartphone eller tablet hos GreenMind, så skal du ikke være nervøs for at miste garantien eller reklamationsretten på dit produkt. Vi overtager nemlig begge dele, når vi har haft din smartphone eller tablet inde til reparation. Læs mere i vores handelsbetingelser:<br>
        <nuxt-link :to="{ name: 'terms-of-trade' }" class="underline text-center y-link">
          Handelsbetingelser
        </nuxt-link>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '~/assets/css/infoPages.scss';
</style>

