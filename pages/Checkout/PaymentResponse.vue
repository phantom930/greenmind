<template>
  <div id="thank-you">
    <SfHeading
      v-if="paymentSuccess"
      :title="$t('Your cart is empty')"
      :level="2"
    />
    <nuxt-link to="/" :title="$t('Thank you for your order')">
      <SfButton class="back-button color-secondary button-size">
        {{
          paymentSuccess ? $t("Thank you for your order") : $t('There is a problem with the order')
        }}
      </SfButton>
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import { SfHeading, SfButton } from '@storefront-ui/vue';
import { ref, onMounted, defineComponent, computed, Ref } from '@nuxtjs/composition-api';
import { usePayment, cartGetters } from '@vue-storefront/odoo';
import { PaymentTransactionState } from '~/green-api/types';
export default defineComponent({
  components: {
    SfHeading,
    SfButton
  },
  emits: ['changeStep'],
  setup(props, { root, emit }) {
    emit('changeStep', 4);

    const paymentResponse = ref(null);
    const paymentStatus : Ref<PaymentTransactionState> = ref(null);
    const { getPaymentConfirmation } = usePayment('');

    const companyDetails = ref({
      name: 'Divante Headquarter',
      street: 'St. Dmowskiego 17, 53-534',
      city: 'Wroclaw, Poland',
      email: 'demo@vuestorefront.io'
    });

    onMounted(async () => {
      const data = await getPaymentConfirmation({ customQuery: { paymentConfirmation: 'greenConfirmationPayment' }});
      paymentResponse.value = data;
      paymentStatus.value = paymentResponse.value.order?.lastTransaction.state;

    });

    const redirectToPayment = () => {
      return root.$router.push('/checkout/payment');
    };

    const paymentSuccess = computed(() =>
      paymentStatus.value === 'Authorized' ||
      paymentStatus.value === 'Confirmed'
    );

    return {
      paymentStatus,
      cartGetters,
      paymentResponse,
      paymentSuccess,
      redirectToPayment,
      companyDetails
    };
  }
});
</script>
<style lang="scss" scoped>
@import '~/assets/css/thankyou.scss';
</style>
