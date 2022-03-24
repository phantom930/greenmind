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
        {{ description }}
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
    const attributesWithoutGrade = computed(() => productGetters.getAttributesValues(props.product));

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
