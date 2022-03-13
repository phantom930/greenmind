<template>
  <SfProductCard
    :key="product.id"
    data-cy="category-product-card"
    :style="{ '--index': product.id }"
    :image-width="imageWidth"
    :image-height="imageHeight"
    :title="productGetters.getName(product)"
    :image="$image(productGetters.getCoverImage(product))"
    :nuxt-img-config="{ fit: 'cover' }"
    image-tag="nuxt-img"
    :regular-price="$n(productGetters.getPrice(product).regular, 'currency')"
    :special-price="
      productGetters.getPrice(product).special &&
        $n(productGetters.getPrice(product).special, 'currency')
    "
    :score-rating="false"
    wishlist-icon="false"
    :show-add-to-cart-button="false"
    :link="
      localePath(
        `/p/${productGetters.getId(product)}/${productGetters.getSlug(product)}`
      )
    "
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
        {{ product.websiteSubtitle }}
      </span>
    </div>

    <div
      slot="price"
      class="price-flex flex justify-center items-baseline"
    >
      <span class="green-product-card__fra">Fra</span>
      <span class="green-product-card__price">$3.99 - $19.09</span>
    </div>
  </SfProductCard>
</template>

<script lang="ts">
import { SfProductCard } from '@storefront-ui/vue';
import { productGetters } from '@vue-storefront/odoo';
import { defineComponent, PropType } from '@vue/composition-api';
import { GreenProduct } from '~/green-api/types';
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
  setup() {
    return {
      productGetters
    };
  }
});
</script>

<style lang="scss" scoped>
@media (min-width: 1024px) {
  .sf-product-card {
    --product-card-max-width: 18.5rem;
  }
}
::v-deep .sf-image {
  left: 7.81%;
  right: 7.81%;
  top: 4.06%;
  bottom: 29.82%;
}

.title-flex {
  padding-top: 11.52px;
}

.price-flex {
  margin-top: 18.29px;
}

.sf-product-card {
  border-radius: 14px;
  width: 295px;
  height: 568.11px;
}
.sf-product-card::after {
  border-radius: 14px;
  cursor: pointer;
}

.green-product-card__title {
  font-family: var(--font-family--primary);
  font-size: 26px;
  font-weight: 500;
  line-height: var(--line-height--primary);
  color: var(--_c-greenmind-black-primary);
}

.green-product-card__description {
  font-family: var(--font-family--primary);
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: var(--line-height--primary);
  color: var(--_c-greenmind-primary-grey);
  padding-top: 2.3px;
}

.green-product-card__price {
  font-style: normal;
  font-weight: 500;
  font-size: 26px;
  line-height: var(--line-height--primary);
}

.green-product-card__fra {
  margin-right: 10px;
}

.green-product-card__fra {
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: var(--line-height--primary);
}
</style>
