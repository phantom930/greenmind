<template>
  <div class="text-wrap">
    <div class="container">
      <h1 class="font-bold title mb">
        Vi anvender cookies
      </h1>
      <p class="text mb">
        GreenMind.dk bruger cookies til at gemme oplysninger om brugerfunktioner såsom sorteringsmuligheder, hvor mange produkter, der vises og muligheden for at være logget ind på hjemmesiden som medlem. Vi bruger også cookies til at indsamle informationer om hvilke sider du besøger på hjemmesiden, så vi kan vise de annoncer, der er mest relevante for dig. Cookies bruges også til at analysere trafikken på hjemmesiden.<br>
Hvis du ikke ønsker at vi skal gemme cookies på din computer, har du mulighed for at blokere brugen af cookies ved at ændre en indstilling i din browser. Besøg da venligst din browsers hjemmeside for information og vejledning. Hvis du vælger at deaktivere cookies, vil dele af hjemmesiden ikke fungerer korrekt.
      </p>
      <br>
      <br>
      <script id="CookieDeclaration" src=https://consent.cookiebot.com/d2da6edf-44b1-4063-a6ef-fe4f37edeb0c/cd.js type="text/javascript" async></script>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  setup() {

  },
  head() {
    return {
      script: [
        { id: 'CookieDeclaration', type: 'text/javascript', src: `https://consent.cookiebot.com/${this.$config.cookieBotKey}/cd.js`, async: true, body: true }
      ]
    };
  }
});
</script>

<style scoped lang="scss">
@import '~/assets/css/infoPages.scss';
</style>
