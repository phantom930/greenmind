<template>
  <div id="dropin-container" />
</template>

<script>
/* eslint-disable camelcase */

import { ref, onMounted } from '@nuxtjs/composition-api';
import { useAdyenDirectPayment } from '~/composables';
// import AdyenCheckout from '@adyen/adyen-web';
// import '@adyen/adyen-web/dist/adyen.css';

export default {
  name: 'AdyenDirectPaymentProvider',
  props: {
    provider: {
      required: true,
      type: Object
    },
    cart: {
      required: true,
      type: Object
    }
  },
  setup(props, { emit }) {
    const adyenDropin = ref(null);

    const {
      openAdyenTransaction,
      getAdyenAcquirerInfo,
      getAdyenPaymentMethods,
      getAdyenPaymentDetails,
      paymentMethods,
      acquirerInfo,
      adyenMakeDirectPayment,
      transaction
    } = useAdyenDirectPayment(props.provider.id, props.cart.order.id);

    onMounted(async() => {
      await openAdyenTransaction();
      await getAdyenAcquirerInfo();
      await getAdyenPaymentMethods();

      const configuration = {
        environment: acquirerInfo.value.state,
        clientKey: acquirerInfo.value.client_key,
        paymentMethodsResponse: paymentMethods.value,
        analytics: {
          enabled: false
        },
        onPaymentCompleted: (result, component) => {
          console.info(result, component);
        },
        onError: (error, component) => {
          console.error(error.name, error.message, error.stack, component);
        },
        onAdditionalDetails: async (state, dropin) => {
          console.log(state);
          await getAdyenPaymentDetails({
            acquirerId: props.provider.id,
            transactionReference: transaction.value.reference,
            paymentDetails: state.data
          });
        },
        onSubmit: async(state, dropin) => {
          console.log(state);
          await adyenMakeDirectPayment({
            acquirerId: props.provider.id,
            reference: transaction.value.reference,
            paymentMethod: state.data.paymentMethod,
            token: transaction.value.access_token,
            browserInfo: { test: '2'}
          });
        },
        paymentMethodsConfiguration: {
          card: {
            hasHolderName: true,
            holderNameRequired: true,
            billingAddressRequired: true
          }
        }
      };

      // const checkout = new AdyenCheckout(configuration);
      // adyenDropin.value = checkout.create(
      //   'dropin', {
      //     openFirstPaymentMethod: true,
      //     openFirstStoredPaymentMethod: false,
      //     showStoredPaymentMethods: false,
      //     showPaymentMethods: true,
      //     showPayButton: false,
      //     setStatusAutomatically: true
      //   }
      // ).mount('#dropin-container');

      emit('isPaymentReady', true);
      emit('providerPaymentHandler', adyenDropin.value.submit);
    });

    return {
      adyenDropin,
      acquirerInfo
    };
  }
};
</script>

<style lang="scss" scoped>
.shipping {
  &__label {
    display: flex;
    justify-content: space-between;
  }

  &__description {
    --radio-description-margin: 0;
    --radio-description-font-size: var(--font-xs);
  }
}
</style>
