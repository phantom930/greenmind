<template>
  <div>
    <SfHeading
      :level="3"
      :title="$t('Order Details')"
      class="sf-heading--left sf-heading--no-underline title mb-5"
    />
    <div class="orders">
      <a
        v-for="(orderLine, index) in orderLines"
        :key="index"
        class="order"
      >
        <div class="img-info-wrap">
          <div class="image-container">
            <img :src="$image(cartGetters.getItemImage(orderLine), 82, 104, cartGetters.getItemImageFilename(orderLine))" :alt="cartGetters.getItemTitle(orderLine)">
          </div>
          <div class="product-info">
            <div class="product-title flex justify-between">
              <div>
                {{ cartGetters.getItemTitle(orderLine) }} | {{ cartGetters.getItemWebsiteTitle(orderLine) }}
              </div>
              <div class="price">
                {{ $currency(cartGetters.getItemPrice(orderLine).regular) }}
              </div>
            </div>

            <div>
              <template v-for="(accessory, acessoryIndex) in productGetters.getAccessoryProducts(orderLine.product)">
                <div
                  v-if="cartGetters.accessoryIsInCart(cart, accessory.id)"
                  :key="acessoryIndex"
                  class="gadget flex justify-between"
                >
                  <span>+ {{ accessory.name }}</span>
                  <span class="price">
                    {{ $currency(accessory.price) }}
                  </span>
                </div>
              </template>
            </div>

          </div>
        </div>
      </a>
    </div>
    <div class="total-price-wrap">
      <div class="subtotal">
        <p>{{ $t('Subtotal') }}:</p>
        <div class="price">
          {{ $currency(totals.subtotal) }}
        </div>
      </div>
      <div class="shipping">
        <p>{{ $t('Shipping') }}:</p>
        <p class="price">
          {{ shippingMethodPrice ? $currency(shippingMethodPrice) : $t('Free') }}
        </p>
      </div>
      <div class="total-price">
        <p class="total">
          {{ $t('Total price') }}:
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
          :has-general-wrapper="true"
        >
          <template #label>
            <span> {{ $t('I agree to') }}
              <nuxt-link :to="{ name: 'terms-of-trade' }" :title="$t('Terms and conditions')">
                {{ $t('Terms and conditions') }}
              </nuxt-link>
            </span>
          </template>
        </GreenCheckbox>
      </div>
      <div class="submit-button">
        <GreenButton
          style-type="Primary"
          color="Green"
          shape="Round"
          :size="$device.isMobile ? 'Max' : 'Medium'"
          :disabled="!agreeTermsConditions"
          @click="$router.push('/checkout/payment')"
        >
          {{ $t("GO TO PAYMENT") }}
        </GreenButton>

        <SfButton
          class="color-primary sf-button payment-btn mt-4 smartphone-only"
          @click="$router.push({ name: 'revieworder'})"
        >
          {{ $t("GO BACK") }}
        </SfButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@nuxtjs/composition-api';
import { SfButton, SfHeading } from '@storefront-ui/vue';
import { useCart, checkoutGetters } from '@vue-storefront/odoo';
import { cartGetters, productGetters } from '~/composables';

export default defineComponent({
  name: 'Revieworder',
  components: {
    SfButton, SfHeading
  },
  setup(props, { root }) {
    const { cart } = useCart();
    const orderLines = computed(() => cartGetters.getItems(cart.value));
    const totals = computed(() => cartGetters.getTotals(cart.value));
    const agreeTermsConditions = ref(false);

    const shippingMethodPrice = computed(() =>
      checkoutGetters.getShippingMethodPrice(cart.value?.order?.shippingMethod)
    );
    return {
      shippingMethodPrice,
      cart,
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
