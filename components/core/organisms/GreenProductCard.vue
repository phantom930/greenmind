<template>
  <nuxt-link :to="localePath( `/p/${productGetters.getId(product)}` )">
    <SfProductCard
      :key="product.id"
      data-cy="category-product-card"
      :style="{ '--index': product.id }"
      :image-width="imageWidth"
      :image-height="imageHeight"
      :title="productGetters.getName(product)"
      :image="$image(productGetters.getCoverImage(product), imageWidth, imageHeight, productGetters.getName(product).trim())"
      :nuxt-img-config="{ fit: 'cover' }"
      image-tag="nuxt-img"
      :badge-label="productHasDiscont ? `-${productDiscontPerc}%` : null"
      :regular-price="$n(productGetters.getPrice(product).regular, 'currency')"
      :special-price="
        productGetters.getPrice(product).special &&
          $n(productGetters.getPrice(product).special, 'currency')
      "
      :score-rating="false"
      wishlist-icon="false"
      :show-add-to-cart-button="false"
      class="products__product-card hover:drop-shadow-xl"
    >
      <div
        slot="title"
        class="title-flex flex flex-col place-items-center text-center"
      >
        <span class="green-product-card__title">{{
          productGetters.getName(product)
        }}</span>
        <span class="green-product-card__description">
          {{ product.websiteSubtitle || '-' }}
        </span>
      </div>

      <div
        slot="price"
        class="price-flex flex justify-center items-baseline"
      >
        <span class="green-product-card__fra">{{ $t('From') }}</span>
        <span class="green-product-card__price">{{ priceWithDiscount }},-</span>
      </div>
    </SfProductCard>
  </nuxt-link>
</template>

<script lang="ts">
import { SfProductCard } from '@storefront-ui/vue';
import { productGetters } from '@vue-storefront/odoo';
import { defineComponent, PropType, computed } from '@nuxtjs/composition-api';
import { GreenProduct } from '~/green-api/types';
import { useCurrency } from '~/composables';

export default defineComponent({
  components: {
    SfProductCard
  },
  props: {
    imageWidth: {
      type: Number,
      default: 248
    },
    imageHeight: {
      type: Number,
      default: 375
    },
    product: {
      type: Object as PropType<GreenProduct>,
      default: () => ({})
    }
  },
  setup(props) {
    const { formatDolar } = useCurrency();

    const productHasDiscont = computed(() => props.product?.combinationInfoVariant?.has_discounted_price);
    const productDiscontPerc = computed(() => props.product?.combinationInfoVariant?.discount_perc);
    const priceWithDiscount = computed(() => formatDolar(props.product?.combinationInfoVariant?.price || 0));

    return {
      priceWithDiscount,
      productDiscontPerc,
      productHasDiscont,
      productGetters
    };
  }
});
</script>

<style lang="scss" scoped>
@import '~/assets/css/greenProductCard.scss';
</style>
