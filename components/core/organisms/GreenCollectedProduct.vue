<template>
  <SfCollectedProduct
    data-cy="collected-product-cart-sidebar"
    :key="cartGetters.getItemSku(product)"
    :image="$image(cartGetters.getItemImage(product))"
    :title="cartGetters.getItemName(product)"
    :regular-price="
      $n(cartGetters.getItemPrice(product).regular)
    "
    :special-price="
      cartGetters.getItemPrice(product).special &&
      $n(cartGetters.getItemPrice(product).special, 'currency')
    "
    :stock="99999"
    :qty="cartGetters.getItemQty(product)"
    :currency=currency
    @input="updateItemQty({ product, quantity: $event })"
    @click:remove="removeItem({ product })"
    class="collected-product"
  >
    <div
      slot="price"
    >
    <SfCheckbox 
      label="teste"
      :selected="false"
      :disabled="false"
    />
    <span class="green-collected-product__price">
        {{ $n(cartGetters.getItemPrice(product).regular) + ' ' + currency}}
    </span>
    </div>
    <template #configuration>
        <div class="collected-product__properties">
        <SfProperty
            v-for="(attribute, key) in cartGetters.getItemAttributes(
            product,
            ['color', 'size']
            )"
            :key="key"
            :name="key"
            :value="attribute"
        />
        </div>
    </template>
  </SfCollectedProduct>
</template>

<script>
import { SfCollectedProduct, SfProperty, SfCheckbox } from "@storefront-ui/vue";
import { useCart, cartGetters } from "@vue-storefront/odoo";
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
    components: {
        SfCollectedProduct,
        SfProperty,
        SfCheckbox
    },
    props: {
        product: {
            type: Object,
            default: () => ({}),
        },
        currency: {
            type: String,
            default: ',-'
        }
    },
    setup() {
        const { removeItem, updateItemQty } = useCart();
        return {
            cartGetters,
            removeItem,
            updateItemQty
        }
    },
})
</script>
