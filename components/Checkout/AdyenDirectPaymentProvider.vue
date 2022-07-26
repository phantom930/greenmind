<template>
  <div>
    <SfLoader :class="{ loader: loading }" :loading="loading" />
    <div id="dropin-container" ref="dropinDivElement" />
  </div>
</template>

<script>
/* eslint-disable camelcase */

import { ref, onMounted } from '@nuxtjs/composition-api';
import { useAdyenDirectPayment } from '~/composables';
import { SfLoader } from '@storefront-ui/vue';
import AdyenCheckout from '@adyen/adyen-web';
import '@adyen/adyen-web/dist/adyen.css';
export default {
  name: 'AdyenDirectPaymentProvider',
  components: {
    SfLoader
  },
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
  onDestroyed() {
    this.adyenDropin.unmount();
    this.adyenDropin = null;
  },
  emits: ['isPaymentReady', 'providerPaymentHandler'],
  setup(props, { emit }) {
    const adyenDropin = ref(null);
    const dropinDivElement = ref(null);
    const loading = ref(false);

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
      loading.value = true;
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
          await getAdyenPaymentDetails({
            acquirerId: props.provider.id,
            transactionReference: transaction.value.reference,
            paymentDetails: state.data
          });
        },
        onChange: (state, component) => {
          console.log(component.isValid);
          if (component.isValid) {
            emit('isPaymentReady', true);
            return;
          }
          emit('isPaymentReady', false);
        },

        onSubmit: async(state, dropin) => {
          const response = await adyenMakeDirectPayment({
            acquirerId: props.provider.id,
            reference: transaction.value.reference,
            paymentMethod: state.data.paymentMethod,
            token: transaction.value.access_token,
            browserInfo: state.data?.browserInfo || {}
          });

          console.log(response);
          if (response.action?.type === 'redirect' && response.action?.paymentMethodType === 'mobilepay') {
            window.open(response.action?.url, '_blank');
          }
        },
        paymentMethodsConfiguration: {
          card: {
            hasHolderName: true,
            holderNameRequired: true,
            billingAddressRequired: true
          }
        }
      };

      const checkout = await AdyenCheckout(configuration);

      adyenDropin.value = checkout.create(
        'dropin', {
          openFirstPaymentMethod: true,
          openFirstStoredPaymentMethod: false,
          showStoredPaymentMethods: false,
          showPaymentMethods: true,
          showPayButton: false,
          setStatusAutomatically: true,
          onSelect: (component) => {
            if (component.isValid) {
              emit('isPaymentReady', true);
              return;
            }
            emit('isPaymentReady', false);
          }
        }
      ).mount(dropinDivElement.value);

      loading.value = false;

      emit('providerPaymentHandler', adyenDropin.value.submit);
    });

    return {
      loading,
      dropinDivElement,
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
