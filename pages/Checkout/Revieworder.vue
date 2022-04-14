<template>
  <div>
    <h3 class="title">
      Order Details
    </h3>
    <div class="orders">
      <a
        v-for="(orderLine, index) in orderLines"
        :key="index"
        class="order"
      >
        <div class="img-info-wrap">
          <div class="image-container">
            <img :src="$image(cartGetters.getItemImage(orderLine), 82, 104, cartGetters.getItemName(orderLine))">
          </div>
          <div class="product-info">
            <div class="product-title">
              {{ cartGetters.getItemName(orderLine) }}
            </div>
            <div class="">
              <div
                v-for="(accessory, acessoryIndex) in productGetters.getAccessoryProducts(orderLine.product)"
                :key="acessoryIndex"
                class="gadget flex justify-between"
              >
                <span>+ {{ accessory.name }}</span>
                <span class="price">
                  {{ $currency(accessory.price) }}
                </span>
              </div>
            </div>
            <div class="code">MSD23-345-324</div>
          </div>
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
        <GreenCheckbox
          v-model="agreeTermsConditions"
          :value="agreeTermsConditions"
          :is-checked="agreeTermsConditions"
          :has-general-wrapper="false"
          label="I agree to Terms and Conditions"
        />
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

<script lang="ts">
import { computed, defineComponent, ref } from '@nuxtjs/composition-api';
import { SfButton } from '@storefront-ui/vue';
import { useCart } from '@vue-storefront/odoo';
import { cartGetters, productGetters } from '~/composables';

export default defineComponent({
  name: 'Revieworder',
  components: {
    SfButton
  },
  setup(props, { root }) {
    const { cart } = useCart();
    const orderLines = computed(() => cartGetters.getItems(cart.value));
    const totals = computed(() => cartGetters.getTotals(cart.value));
    const agreeTermsConditions = ref(false);

    return {
      agreeTermsConditions,
      cartGetters,
      totals,
      orderLines,
      productGetters
    };
  }
});
</script>

<style lang="scss" scoped>
@import '~/assets/css/revieworder.scss'
</style>
