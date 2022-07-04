<template>
  <div class="text-wrap">
    <div class="container">
      <h1 class="font-bold title mb">
        Søg job hos GreenMind
      </h1>
      <p class="text mb">
        Hos GreenMind kæmper vi imod de mange millioner tons elektronik-skrald der produceres hvert år.
        <br><br>
        Med 14 fysisker butikker og over 200 ansatte er GreenMind Danmarks største forhandler af refurbished elektronik.
        <br><br>
        Ud over salg af refurbished elektronik, er GreenMind også blandt Danmarks største reparatørere af iPhones, Android Smartphones, Macbook og laptops.
        <br><br>
        Vi søger løbende både butikspersonale, teknikere m.m. Ser du ikke en stilling der lige passer på din profil herunder, så er du også meget velkommen til at sende os en uopfordret ansøgning.
      </p>
      <h3 class="font-bold subtitle mb">
        Ledige stillinger hos GreenMind
      </h3>
      <div id="elvium_positions"></div>
      <script type="application/javascript" src="https://app.elvium.com/packs/js/export_job_postings.js"></script>
      <script>
        new ElviumJobPostings('#elvium_positions', 'greenmind', 'da', {
          domain: 'https://app.elvium.com',
          referer_host: 'greenmind.dk'
        })
      </script>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '~/assets/css/infoPages.scss';
</style>
