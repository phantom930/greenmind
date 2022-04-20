<template>
  <SfTabs
    :open-tab="1"
    class="product__tabs"
  >
    <SfTab
      data-cy="product-tab_description"
      title="Description"
    >
      <div class="product__description">
        <!-- {{ description }} -->
        iPhone 8 er 70% hurtigere end iPhones 7 og kendt som én af de sidste klassiske iPhones med den fysiske og funktionelle Hjem-knap. <br><br>

        Når du køber en brugt iPhone hos GreenMind, kan du typisk vælge mellem fem forskellige brugsstande. Uanset stand er alle vores enheder testet og klargjort. Vi tilbyder også tilbehør til iPhone som tilkøb, f.eks. skærmbeskytter, cover og oplader. <br><br>

        Og at købe en brugt iPhone 8 er mere end bare billigt! Du bidrager til den grønne omstilling, får et godt produkt samt 2 års garanti. Alle vores brugte iPhones er nulstillede og dataslettede ligesom når du køber en ny telefonen - og de er alle ulåste (uden binding til abonnement).
      </div>
    </SfTab>
    <SfTab
      :title="$t('Specifications')"
      data-cy="product-tab_additional"
      class="product__additional-info"
    >
      <div class="product__additional-info">
        <div
          v-for="attributeValue, index in attributesWithoutGrade"
          :key="index"
        >
          <p class="product__additional-info__title">
            {{ attributeValue.attribute.name }}
          </p>
          <p class="product__additional-info__value">
            {{ attributeValue.name }}
          </p>
        </div>
      </div>
      <div>
        <span class="text-primary-grey">Hvad er forskellen på en iPhone 8 og iPhone 8 Plus?</span><br>
        Det bliver bestemt ikke lettere at vælge mellem Apples produkter, når de bliver ved med at tilføje nye produkter på markedet. Så hvad skal du vælge?

        Om du vælger en iPhone 8 eller iPhone 8 plus er en smagssag, da det i høj grad er størrelsen på telefonerne, som er den vigtigste forskel. iPhone 8 har et mere kompakt design, som ligger godt i hånden. iPhone 8 Plus er en del større, og har også et kamera med flere pixels.
        <br><br>
        <span class="text-primary-grey">Hvor meget plads skal du bruge på telefonen?</span><br>
        Derudover skal du overveje om du vil have en telefon med 64 GB eller 256 GB. Det er altid en god ide at tjekke hukommelsen på dine tidligere mobiltelefoner, og vurdere om det har været passende til dit brug. 64 GB går an for de fleste, hvor du har plads til dine apps og billeder. Derudover kan iCloud bruges til at opbevare de filer, der fylder meget såsom billeder og videoer. 256 GB giver dig større kapacitet, hvis du gerne vil have plads til bøger, film, dokumenter, billeder, apps osv. direkte på telefonen - og f.eks. har tendens til at optage mange/længere videoer.
      </div>
    </SfTab>
  </SfTabs>
</template>
<script lang="ts">
import { defineComponent, computed, PropType } from '@nuxtjs/composition-api';
import { productGetters } from '~/composables';
import { SfTabs } from '@storefront-ui/vue';
import { GreenProduct } from '~/green-api/types';
export default defineComponent({
  components: {
    SfTabs
  },
  props: {
    product: {
      type: Object as PropType<GreenProduct>,
      default: () => ({})
    }
  },
  setup(props) {

    const description = computed(() => productGetters.getDescription(props.product));
    const attributesWithoutGrade = computed(() => [...productGetters.getAttributesValues(props.product),
      { attribute: { name: 'STØRRELSE'}, name: '13.84 x 6.73 x0.73 cm'},
      { attribute: { name: 'VÆGT'}, name: '148 gram'},
      { attribute: { name: 'LAGERPLADS'}, name: '64 GB'},
      { attribute: { name: 'BATTERIKAPACITET'}, name: '90%'},
      { attribute: { name: 'SIMKORTTYPE'}, name: 'NanoSIM'},
      { attribute: { name: 'STIKTYPE'}, name: 'Lightning'},
      { attribute: { name: 'SKÆRM'}, name: '4.7 ” 750 x 1334 True Tone-skærm'}
    ]);

    return {
      attributesWithoutGrade,
      description
    };
  }
});
</script>

<style scoped lang="scss">
.product__additional-info {
    color: var(--c-link);
    @include font(--additional-info-font, var(--font-weight--light), var(--font-size--sm), 1.6,  var(--font-family--primary));
    &__title {
        font-weight: var(--font-weight--normal);
        font-size: var(--font-size--base);
    }
    &__value {
        margin: 0 0 var(--spacer-sm);
    }
    &__paragraph {
        margin: 0;
    }
}
</style>
