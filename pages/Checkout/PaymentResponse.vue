<template>
  <div id="thank-you">
    <SfHeading
      :title="$t('Your cart is empty')"
      :level="2"
    />
    <nuxt-link to="/" :title="$t('Thank you for your order')">
      <SfButton class="back-button color-secondary button-size">
        {{
          $t("Thank you for your order")
        }}
      </SfButton>
    </nuxt-link>
  </div>
</template>

<script>
import { SfHeading, SfButton } from '@storefront-ui/vue';
import { ref, onMounted } from '@nuxtjs/composition-api';
import { usePayment, cartGetters } from '@vue-storefront/odoo';
export default {
  components: {
    SfHeading,
    SfButton
  },
  emits: ['changeStep'],
  setup(props, { root, emit }) {
    emit('changeStep', 4);

    const paymentResponse = ref(null);
    const { getPaymentConfirmation } = usePayment();

    const companyDetails = ref({
      name: 'Divante Headquarter',
      street: 'St. Dmowskiego 17, 53-534',
      city: 'Wroclaw, Poland',
      email: 'demo@vuestorefront.io'
    });

    onMounted(async () => {
      const data = await getPaymentConfirmation({ customQuery: { paymentConfirmation: 'greenConfirmationPayment' }});
      paymentResponse.value = data;
    });

    const redirectToPayment = () => {
      return root.$router.push('/checkout/payment');
    };

    return {
      cartGetters,
      paymentResponse,
      redirectToPayment,
      companyDetails
    };
  }
};
</script>
<style lang="scss" scoped>
@import '~/assets/css/thankyou.scss';
</style>
