<template>
  <div class="payment-page">
    <h3 class="title">
      {{ $t('Payment list') }}
    </h3>
    <div
      v-for="provider in providerList"
      :key="provider.id"
    >
      <SfHeading
        :level="3"
        :title="provider.name"
        class="sf-heading--left sf-heading--no-underline title"
      />
      <!-- <div v-if="provider.paymentIcons" class="payment-method">
        <GreenCheckbox
          v-for="icon in provider.paymentIcons"
          :key="icon.id"
          :value="icon.id"
          :emit-value="true"
          :is-checked="selectedProvider === icon.id"
          title="accessoryProduct.name"
          description="accessoryProduct.description"
          :has-image="true"
          @change="selectProvider"
        >
          <template #image>
            <SfImage
              :src="$image(icon.image, 57, 25, icon.name)"
              :alt="icon.name || 'icon-image'"
              :width="57"
              :height="25"
            />
          </template>
        </GreenCheckbox>
      </div> -->

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

    <abstract-payment-observer v-if="selectedProvider.name">
      <component
        :is="getComponentProviderByName(selectedProvider.name)"
        class="py-8"
        :provider="selectedProvider"
        @isPaymentReady="isPaymentReady = arguments[0]"
        @providerPaymentHandler="providerPaymentHandler = arguments[0]"
      />
    </abstract-payment-observer>

    <span v-if="cartExcedLimitTotalAmount">
      You can't pass over 50000!
    </span>
    <GreenButton
      style-type="Primary"
      color="Green"
      shape="Round"
      size="Medium"
      :disabled="!canFinishPayment"
      class="my-5 desktop-only"
      @click="providerPaymentHandler()"
    >
      {{ $t("Confirm & Pay") }}
    </GreenButton>
  </div>
</template>

<script >
import { SfHeading, SfImage } from '@storefront-ui/vue';
import { onSSR } from '@vue-storefront/core';
import { cartGetters, useCart, useMakeOrder, usePayment } from '@vue-storefront/odoo';
import { computed, defineComponent, ref } from '@vue/composition-api';
import { useUiHelpers } from '~/composables';

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

    const { providerList, getPaymentProviderList } = usePayment(String(cart.value?.order?.id));
    const { order, make, loading } = useMakeOrder();
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

    const processOrder = async () => {
      await make();

      // const thankYouPath = {
      //   name: 'thank-you',
      //   query: { order: orderGetters.getId(order.value) }
      // };
      // context.root.$router.push(context.root.localePath(thankYouPath));
      // setCart(null);
    };

    const providerPaymentHandler = () => {};

    const cartExcedLimitTotalAmount = computed(() => cart?.value?.order?.amountTotal > 50000);

    const canFinishPayment = computed(() => !cartExcedLimitTotalAmount.value && isPaymentReady.value);

    const providerListHasMoreThanOne = computed(
      () => providerList.value.length > 1
    );

    return {
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
@import '~/assets/css/payment.scss';
</style>
