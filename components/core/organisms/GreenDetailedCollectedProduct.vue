<template>
  <SfCollectedProduct
    :key="cartGetters.getItemSku(product)"
    data-cy="collected-product-cart-sidebar"
    :image="$image(cartGetters.getItemImage(product))"
    :title="cartGetters.getItemName(product)"
    :regular-price="$n(cartGetters.getItemPrice(product).regular)"
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
    <div slot="price">
      <div class="collected_product_checkbox_wrapper">
        <span class="green-collected-product__checkbox-title">
          {{ checkboxTitle }}
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
      <span class="green-collected-product__price">
        {{ $n(cartGetters.getItemPrice(product).regular) + " " + currency }}
      </span>
    </div>
    <template #configuration>
      <div class="collected-product__properties">
        <SfProperty
          v-for="(attribute, key) in cartGetters.getItemAttributes(product, [
            'color',
            'size',
          ])"
          :key="key"
          :name="key"
          :value="attribute"
        />
      </div>
    </template>
    <template #actions>
      <div class="actions desktop-only">
        <SfButton class="sf-button--text actions__button">
          Edit
        </SfButton>
      </div>
    </template>
  </SfCollectedProduct>
</template>

<script>
import { SfCollectedProduct, SfProperty } from '@storefront-ui/vue';
import { useCart, cartGetters } from '@vue-storefront/odoo';
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
::v-deep .description-wrap {
  margin-left: 0 !important;
}
::v-deep .product-title {
  font-size: 16px !important;
  font-weight: 500 !important;
  color: var(--_c-greenmind-primary-grey) !important;
  margin-right: 5px !important;
  line-height: 20px !important;
}
::v-deep .sf-checkbox__checkmark {
  width: 24px !important;
  height: 24px !important;
  margin-right: 2% !important;
}
::v-deep .price {
  font-size: 16px !important;
  font-weight: 500 !important;
  color: var(--_c-greenmind-fern-primary-medium-green) !important;
  position: inherit !important;
  line-height: 20px !important;
}
::v-deep .general_wrapper {
  display: flex;
  width: 125%;
}
.green-collected-product__price {
  position: absolute;
  right: 0;
  bottom: 35px;
  font-family: var(--font-family--primary);
  font-size: 20px;
  font-weight: 500;
  color: var(--_c-greenmind-primary-black);
}
::v-deep .sf-collected-product__aside {
  display: inline-flex;
  flex: 0.5 0 4rem;
}
::v-deep .sf-collected-product__configuration {
  display: none;
}
::v-deep .sf-image {
  height: 100%;
}
::v-deep .sf-collected-product__details {
  flex: 2;
}
::v-deep .sf-collected-product__title-wraper {
  transform: translate(-130%, 0%);
  width: 25%;
}
::v-deep .sf-collected-product__actions {
  display: none;
}
.green-collected-product__checkbox-title {
  font-size: 18px;
  color: var(--_c-greenmind-primary-black);
  font-weight: 400;
}
::v-deep .img-description-wrap {
  padding-left: 0% !important;
}
::v-deep .collected_product_checkbox_wrapper {
  transform: translate(0%, -50%);
}
::v-deep .sf-collected-product__remove--text {
  font-family: var(--font-family--primary);
  color: var(--_c-greenmind-primary-grey);
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
}
</style>
