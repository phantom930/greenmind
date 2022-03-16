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
    :currency="currency"
    :checkbox-title="checkboxTitle"
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
        {{ $n(cartGetters.getItemPrice(product).regular) + " " + currency }}
      </span>

      <div class="mt-3">
        <span class="green-collected-product__checkbox-title mb-1">
          {{ $t('Acquisition') }}
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
      </div>
    </template>
  </SfCollectedProduct>
</template>

<script>
import { SfCollectedProduct, SfProperty } from '@storefront-ui/vue';
import { useCart } from '@vue-storefront/odoo';
import { cartGetters } from '~/composables';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  components: {
    SfCollectedProduct,
    SfProperty
  },
  props: {
    product: {
      type: Object,
      default: () => ({})
    },
    currency: {
      type: String,
      default: ',-'
    },
    checkboxTitle: {
      type: String,
      default: ''
    }
  },
  setup() {
    const { removeItem, updateItemQty } = useCart();
    return {
      cartGetters,
      removeItem,
      updateItemQty
    };
  }
});
</script>

<style scoped>
@import url('~/assets/css/collectedPoduct.scss');
</style>
