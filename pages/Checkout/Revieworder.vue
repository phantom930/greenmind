<template>
  <div>
    <h3 class="title">
      Order Details
    </h3>
    <div class="orders">
      <a
        v-for="(product, index) in products"
        :key="index"
        class="order"
      >
        <div class="img-info-wrap">
          <div class="image-container">
            <img :src="$image(cartGetters.getItemImage(product), 82, 104, cartGetters.getItemName(product))">
          </div>
          <div class="product-info">
            <div class="product-title">
              {{ cartGetters.getItemName(product) }}
            </div>
            <div class="gadget">+ Screenprotection</div>
            <div class="gadget">+ Forsikring All Risk</div>
            <div class="code">MSD23-345-324</div>
          </div>
        </div>
        <div class="costs">
          <div class="price">
            {{ $currency(cartGetters.getItemPrice(product).regular) }}
          </div>
          <p>149,-</p>
          <p>599,-</p>
        </div>
      </a>
    </div>
    <div class="total-price-wrap">
      <div class="subtotal">
        <p>Subtotal:</p>
        <div class="price">
          {{ $currency(totals.subtotal) }}
        </div>
      </div>
      <div class="shipping">
        <p>Shipping:</p>
        <p class="price">
          Free
        </p>
      </div>
      <div class="total-price">
        <p class="total">
          Total price:
        </p>
        <p class="price">
          {{ $currency(totals.total) }}
        </p>
      </div>
    </div>
    <div class="checkbox-button-wrap">
      <div class="checkbox-wrap">
        <GreenCheckbox />
        <p class="label">
          I agree to <a href="#">Terms and Conditions</a>
        </p>
      </div>
      <div class="submit-button">
        <SfButton
          class="color-primary sf-button payment-btn"
          @click="$router.push('/checkout/payment')"
        >
          {{ $t("GO TO PAYMENT") }}
        </SfButton>
        <SfButton
          class="color-primary sf-button payment-btn mt-4 smartphone-only"
          @click="$router.push('/checkout/shipping')"
        >
          {{ $t("GO BACK") }}
        </SfButton>
      </div>
    </div>
  </div>
</template>

<script>
import { SfButton } from '@storefront-ui/vue';
import { computed, watch } from '@vue/composition-api';
import { useCart, useUserOrder, orderGetters, cartGetters } from '@vue-storefront/odoo';
import { onSSR } from '@vue-storefront/core';

export default {
  name: 'Revieworder',
  components: {
    SfButton
  },
  setup(props, { root }) {
    const { cart } = useCart();
    const products = computed(() => cartGetters.getItems(cart.value));
    const totals = computed(() => cartGetters.getTotals(cart.value));
    const totalItems = computed(() => cartGetters.getTotalItems(cart.value));
    if (totalItems.value === 0) root.$router.push('/cart');
    watch(
      () => totalItems.value,
      () => {
        if (totalItems.value === 0) root.$router.push('/cart');
      }
    );
    return {
      cartGetters,
      totals,
      products
    };
  }
};
</script>

<style lang="scss" scoped>
@import '~/assets/css/revieworder.scss'
</style>
