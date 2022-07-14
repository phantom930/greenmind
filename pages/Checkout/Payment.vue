<template>
  <div class="payment-page">
    <h3 class="title">
      {{ $t("Payment list") }}
    </h3>
    <template v-if="totals.total !== 0">
      <div v-for="provider in providerList" :key="provider.id">
        <SfHeading
          :level="3"
          :title="provider.name"
          class="sf-heading--left sf-heading--no-underline title"
        />

        <GreenCheckbox
          v-model="selectedProvider"
          :value="provider"
          :is-checked="selectedProvider.id === provider.id"
          :has-general-wrapper="false"
          emit-value
          :label="provider.name"
          @change="selectProvider"
        />
      </div>
    </template>

    <abstract-payment-observer v-if="selectedProvider.provider">
      <component
        :is="getComponentProviderByName(selectedProvider.provider)"
        class="py-8"
        :provider="selectedProvider"
        @isPaymentReady="isPaymentReady = arguments[0]"
        @providerPaymentHandler="providerPaymentHandler = arguments[0]"
      />
    </abstract-payment-observer>

    <span v-if="cartExcedLimitTotalAmount"> You can't pass over 50000! </span>
    <GreenButton
      v-if="totals.total === 0"
      style-type="Primary"
      color="Green"
      shape="Round"
      :loading="loading"
      :disabled="!canFinishPayment"
      :size="$device.isMobile ? 'Max' : 'Medium'"
      class="my-5"
      @click="handleMakeGiftPayment"
    >
      {{ $t("Confirm & Pay") }}
    </GreenButton>
    <GreenButton
      v-else
      style-type="Primary"
      color="Green"
      shape="Round"
      :disabled="!canFinishPayment"
      :size="$device.isMobile ? 'Max' : 'Medium'"
      class="my-5"
      @click="providerPaymentHandler()"
    >
      {{ $t("Confirm & Pay") }}
    </GreenButton>
  </div>
</template>

<script >
import { SfHeading, SfImage } from '@storefront-ui/vue';
import { onSSR } from '@vue-storefront/core';
import { cartGetters, useCart, useMakeOrder } from '@vue-storefront/odoo';
import { computed, defineComponent, ref, useRouter } from '@nuxtjs/composition-api';
import { useUiHelpers, usePayment, useUiNotification } from '~/composables';

export default defineComponent({
  name: 'Payment',
  components: {
    SfHeading,
    SfImage,
    VsfPaymentProvider: () =>
      import('~/components/Checkout/VsfPaymentProvider'),
    AdyenPaymentProvider: () =>
      import('~/components/Checkout/AdyenPaymentProvider'),
    AdyenExternalPaymentProvider: () =>
      import('~/components/Checkout/AdyenExternalPaymentProvider'),
    WireTransferPaymentProvider: () =>
      import('~/components/Checkout/WireTransferPaymentProvider'),
    AbstractPaymentObserver: () =>
      import('~/components/Checkout/AbstractPaymentObserver')
  },
  emits: ['status'],
  setup(props, context) {
    const { cart, load } = useCart();
    const { send } = useUiNotification();
    const router = useRouter();

    const { loading, makeGiftCardPayment, providerList, getPaymentProviderList } = usePayment(String(cart.value?.order?.id));
    const { make } = useMakeOrder();
    const th = useUiHelpers();

    const isPaymentReady = ref(false);
    const terms = ref(false);
    const selectedProvider = ref(false);

    const selectProvider = (provider) => {
      isPaymentReady.value = false;
      selectedProvider.value = provider || {};
      context.emit('status');
    };

    onSSR(async () => {
      await load();
      await getPaymentProviderList();
    });

    const handleMakeGiftPayment = async () => {
      const response = await makeGiftCardPayment();
      if (!response) {
        send({ message: 'Some error occurr', type: 'danger' });
      }

      router.push('/');
    };

    const processOrder = async () => {
      await make();
    };

    const providerPaymentHandler = () => {};

    const cartExcedLimitTotalAmount = computed(() => cart?.value?.order?.amountTotal > 50000);

    const canFinishPayment = computed(() => (!cartExcedLimitTotalAmount.value && isPaymentReady.value) || cart?.value?.order?.amountTotal === 0);

    const providerListHasMoreThanOne = computed(
      () => providerList.value.length > 1
    );

    return {
      handleMakeGiftPayment,
      cartExcedLimitTotalAmount,
      canFinishPayment,
      isPaymentReady,
      terms,
      loading,
      products: computed(() => cartGetters.getItems(cart.value)),
      totals: computed(() => cartGetters.getTotals(cart.value)),
      tableHeaders: ['Description', 'Size', 'Color', 'Quantity', 'Amount'],
      cartGetters,
      processOrder,
      providerList,
      selectProvider,
      selectedProvider,
      providerListHasMoreThanOne,
      providerPaymentHandler,
      getComponentProviderByName: th.getComponentProviderByName
    };
  }
});
</script>

<style lang="scss" scoped>
@import "~/assets/css/payment.scss";
</style>
