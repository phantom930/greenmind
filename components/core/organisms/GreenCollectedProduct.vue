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
    :currency="currency"
    :checkbox_title="checkbox_title"

    @input="updateItemQty({ product, quantity: $event })"
    @click:remove="removeItem({ product })"
    class="collected-product"
  >
    <div
      slot="price"
    >
    <span class="green-collected-product__checkbox-title">
        {{ checkbox_title }}
    </span>
    <GreenCheckbox
      v-for="accessoryProducts in product.accessoryProducts"
      :key="accessoryProducts.id"
      :title="accessoryProducts.name"
      :price="accessoryProducts.price"
    />
    <GreenCheckbox
      title="Screenprotection"
      price="149,-"
    />
    <GreenCheckbox
      title="Adapter"
      price="99,-"
    />
    <GreenCheckbox
      title="Forsikring All Risk"
      price="fra 599,-"
    />
    <GreenCheckbox
      title="Forsikring skærm"
      price="fra 299,-"
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
        SfCheckbox,
    },
    props: {
        product: {
            type: Object,
            default: () => ({}),
        },
        currency: {
            type: String,
            default: ',-'
        },
        checkbox_title: {
            type: String,
            default: ''
        }
    },
    setup() {
        const { removeItem, updateItemQty } = useCart();
        console.log(cartGetters.getItemSku(product))
        return {
            cartGetters,
            removeItem,
            updateItemQty
        }
    },
})
</script>

<style scoped>
::v-deep .description-wrap {
    margin-left: 0 !important;
}
::v-deep .product-title {
    font-size: 12px !important;
    font-weight: 300 !important;
    color: var(--_c-greenmind-primary-grey) !important;
    margin-right: 5px !important;
}
::v-deep .sf-checkbox__checkmark {
    width: 16px !important;
    height: 16px !important;
}
::v-deep .price {
    font-size: 12px !important;
    font-weight: 300 !important;
    color: var(--_c-greenmind-fern-primary-medium-green) !important;
    position: inherit !important;
}
::v-deep .general_wrapper {
    display: flex;
    width: 100%;
}
.green-collected-product__price {
    position: absolute;
    right: 0;
    bottom: 0;
    font-family: var(--font-family--primary);
    font-size: 20px;
    font-weight: 500;
    color: var(--_c-greenmind-primary-black);
}
</style>