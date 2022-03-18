<template>
  <SfCollectedProduct
    :key="cartGetters.getItemSku(product)"
    data-cy="collected-product-cart-sidebar"
    :image="$image(cartGetters.getItemImage(product))"
    :title="cartGetters.getItemName(product)"
    :regular-price="$n(cartGetters.getItemPrice(product).regular)"
    :image-width="140"
    :image-height="200"
    :special-price="
      cartGetters.getItemPrice(product).special &&
        $n(cartGetters.getItemPrice(product).special, 'currency')
    "
    :stock="99999"
    :qty="cartGetters.getItemQty(product)"
    class="collected-product"
    @input="updateItemQty({ product, quantity: $event })"
    @click:remove="removeItem({ product })"
  >
    <template #title>
      <span class="custom-product-title"> {{ cartGetters.getCartItemTitle(product) }} </span>
      <span class="custom-subtitle"> {{ cartGetters.getCartItemWebsiteTitle(product.product) }} </span>
      <span class="custom-stand"> Stand: Meget flat </span>
    </template>
    <template #configuration>
      <div />
    </template>

    <template #price>
      <span class="green-collected-product__price">
        {{ $n(cartGetters.getItemPrice(product).regular) }}
      </span>

      <div class="mt-3">
        <span class="green-collected-product__checkbox-title mb-1">
          {{ $t('Acquisition') }}
        </span>
        <GreenCheckbox
          v-for="acessoryProduct in accessoryProducts"
          :key="acessoryProduct.id"
          :title="acessoryProduct.name"
          :price="acessoryProduct.price"
        />
      </div>
    </template>
  </SfCollectedProduct>
</template>

<script >
import { SfCollectedProduct } from '@storefront-ui/vue';
import { useCart } from '@vue-storefront/odoo';
import { cartGetters } from '~/composables';
import { defineComponent, computed } from '@nuxtjs/composition-api';

export default defineComponent({
  components: {
    SfCollectedProduct
  },
  props: {
    product: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const { removeItem, updateItemQty } = useCart();

    const accessoryProducts = computed(() => props.product?.product?.accessoryProducts);

    return {
      accessoryProducts,
      cartGetters,
      removeItem,
      updateItemQty
    };
  }
});
</script>

<style scoped>
@import '~/assets/css/collectedPoduct.scss';
</style>
