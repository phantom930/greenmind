<template>
  <div id="thank-you">
    <SfCallToAction
      v-e2e="'thank-you-banner'"
      class="banner"
      :image="{
        mobile: require('/assets/images/thankyou/bannerM2.webp'),
        desktop: require('/assets/images/thankyou/bannerD2.webp'),
      }"
    >
    <!-- <SfCallToAction
      v-e2e="'thank-you-banner'"
      class="banner"
      title="Thank you for your order!"
      :image="{
        mobile: '/thankyou/bannerM.png',
        desktop: '/thankyou/bannerD.png',
      }"
    > -->
      <!--<template #description>
        <div class="banner__order-number">
          <span>{{ $t("Order No. ") }}</span>
          <strong>{{ cartGetters.getOrderNumber(cart) }}</strong>
        </div>
        <div
          v-if="paymentRefused"
          class="banner__order-number"
        >
          <SfButton
            class="sf-button--pure sf-header__action"
            @click="redirectToPayment"
          >
            Pay
          </SfButton>
        </div>
      </template>-->
    </SfCallToAction>

    <nuxt-link to="/">
      <SfButton class="back-button color-secondary button-size">
        {{
          $t("Go back to shop")
        }}
      </SfButton>
    </nuxt-link>
  </div>
</template>

<script>
import { SfHeading, SfButton, SfCallToAction } from '@storefront-ui/vue';
import { ref, onMounted } from '@nuxtjs/composition-api';
import { usePayment, useCart, cartGetters } from '@vue-storefront/odoo';
export default {
  components: {
    SfHeading,
    SfButton,
    SfCallToAction
  },
  emits: ['changeStep'],
  setup(props, { root, emit }) {
    emit('changeStep', 4);

    const { getPaymentConfirmation } = usePayment();
    const { cart } = useCart();

    const companyDetails = ref({
      name: 'Divante Headquarter',
      street: 'St. Dmowskiego 17, 53-534',
      city: 'Wroclaw, Poland',
      email: 'demo@vuestorefront.io'
    });

    onMounted(async () => {
      await getPaymentConfirmation();
    });

    const redirectToPayment = () => {
      return root.$router.push('/checkout/payment');
    };

    return {
      cartGetters,
      cart,
      redirectToPayment,
      companyDetails
    };
  }
};
</script>
<style lang="scss" scoped>
@import '~/assets/css/thankyou.scss';
</style>
