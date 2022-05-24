<template>
  <div class="text-wrap">
    <div class="container">
      <h1 class="font-bold title mb">
        Send din enhed til reparation
      </h1>
      <p class="text mb">
        Guide til indsendelse af enhed til reparation hos GreenMind A/S (forsikringskunder bedes følge instrukserne i det tilsendte infobrev).<br>
        Du kan også altid aflevere din enhed i én af vores butikker. Læs mere her:<br>
        <nuxt-link :to="{ name: 'shops' }" class="underline text-center y-link">
          Find butik
        </nuxt-link>
      </p>
      <h3 class="font-bold">
        Trin 1, følgebrev
      </h3>
      <p class="text mb">
        Download følgebrevet, udfyld alle punkter og print det ud – følgebrevet kan hentes her:<br>
        <a href="/static/GreenMind_foelgebrev_forsikring_20220517.pdf" download="" class="underline y-link">FORSIKRINGSKUNDE</a><br>
        <a href="/static/GreenMind_foelgebrev_privat_20220517.pdf" download="" class="underline y-link">PRIVATKUNDE</a>
      </p>
      <h3 class="font-bold">
        Trin 2, backup
      </h3>
      <p class="text mb">
        Foretag backup af dit data på enheden. GreenMind A/S kan ikke stilles til ansvar for tab af data i forbindelse med reparationen.
      </p>
      <h3 class="font-bold">
        Trin 3, Deaktivering af Find My iPhone
      </h3>
      <p class="text mb">
        Hvis du indleverer en iPhone, iPad, iMac eller Macbook er det vigtigt at du deaktiverer Find My iPhone.<br>
        <nuxt-link :to="{ name: 'disableFindMinIphone' }" class="underline text-center y-link">
          Deaktivering af Find Min iPhone
        </nuxt-link>
        Årsagen er at vi ikke kan teste, og i nogle tilfælde heller ikke reparere, Apple produkter, hvis ikke “Find My iPhone” er deaktiveret.
      </p>
      <h3 class="font-bold">
        Trin 4, følgebrev
      </h3>
      <p class="text mb">
        Vedlæg det udfyldte følgebrev i forsendelsen sammen med din defekte enhed.<br>
        Send kun følgebrevet og din defekte enhed inkl. batteri og intet andet.<br>
        Tilbehør som beskyttelsescover, oplader og SIM-kort skal ikke sendes med.
      </p>
      <h3 class="font-bold">
        Trin 5, selve forsendelsen
      </h3>
      <p class="text mb">
        Send pakken til vores pakkeværksted på følgende adresse:<br>
        GreenMind A/S<br>
        C/O Blue House<br>
        Brudelysvej 23<br>
        2880 Bagsværd
      </p>
      <h3 class="font-bold">
        Trin 6, modtagelse og betaling
      </h3>
      <p class="text mb">
        Vi modtager din enhed og udfører reparationen.<br>
        Derefter sender vi dig et betalingslink til din e-mail.<br>
        Når betalingen for reparationen er gennemført, sender vi din reparerede enhed retur til dig.
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '~/assets/css/infoPages.scss';
</style>


