<template>
  <SfCollectedProduct
    data-cy="collected-product-cart-sidebar"
    :key="cartGetters.getItemSku(product)"
    :image="$image(cartGetters.getItemImage(product))"
    :title="cartGetters.getItemName(product)"
    :regular-price="
      $n(cartGetters.getItemPrice(product).regular, 'currency')
    "
    :special-price="
      cartGetters.getItemPrice(product).special &&
      $n(cartGetters.getItemPrice(product).special, 'currency')
    "
    :stock="99999"
    :qty="cartGetters.getItemQty(product)"
    @input="updateItemQty({ product, quantity: $event })"
    @click:remove="removeItem({ product })"
    class="collected-product"
  >
      
  </SfCollectedProduct>
</template>

<script>
import { SfCollectedProduct } from "@storefront-ui/vue";
import { cartGetters } from "@vue-storefront/odoo";
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
    components: {
        SfCollectedProduct
    },
    props: {
        product: {
            type: Object,
            default: () => ({}),
        },
    },
    setup() {
        return {
            cartGetters,
        }
    },
})
</script>
