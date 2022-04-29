<template>
  <div class="payment-page">
    <h3 class="title">
      Payment Methods
    </h3>
    <div class="payment-method">
      <div class="method">
        <label class="container">
          <input type="checkbox" checked="checked">
          <span class="checkmark" />
        </label>
        <img :src="require('/assets/images/payment/visa.png')">
      </div>
      <div class="method">
        <label class="container">
          <input type="checkbox" checked="checked">
          <span class="checkmark" />
        </label>
        <img :src="require('/assets/images/payment/master.png')">
      </div>
      <div class="method">
        <label class="container">
          <input type="checkbox" checked="checked">
          <span class="checkmark" />
        </label>
        <img :src="require('/assets/images/payment/visae.png')">
      </div>
      <div class="method">
        <label class="container">
          <input type="checkbox" checked="checked">
          <span class="checkmark" />
        </label>
        <p>Cash on delivery</p>
      </div>
      <div class="method">
        <label class="container">
          <input type="checkbox" checked="checked">
          <span class="checkmark" />
        </label>
        <p>Check</p>
      </div>
    </div>

    <span v-if="cartExcedLimitTotalAmount">
      You can't pass over 50000!
    </span>
    <GreenButton
      type="Primary"
      color="Green"
      shape="Round"
      size="Medium"
      :disabled="!canFinishPayment"
      class="my-5 desktop-only"
    >
      {{ $t("Confirm & Pay") }}
    </GreenButton>
  </div>
</template>

<script >
import { SfButton, SfInput, SfSelect } from '@storefront-ui/vue';
import { onSSR } from '@vue-storefront/core';
import { useUiHelpers } from '~/composables';
import { ref, computed, defineComponent } from '@vue/composition-api';
import { useMakeOrder, useCart, cartGetters, orderGetters, usePayment } from '@vue-storefront/odoo';

export default defineComponent({
  name: 'Payment',
  components: {
    SfButton,
    SfInput,
    SfSelect
    // VsfPaymentProvider: () =>
    //   import('~/components/Checkout/VsfPaymentProvider'),
    // AdyenPaymentProvider: () =>
    //   import('~/components/Checkout/AdyenPaymentProvider'),
    // AdyenExternalPaymentProvider: () =>
    //   import('~/components/Checkout/AdyenExternalPaymentProvider'),
    // WireTransferPaymentProvider: () =>
    //   import('~/components/Checkout/WireTransferPaymentProvider'),
    // AbstractPaymentObserver: () =>
    //   import('~/components/Checkout/AbstractPaymentObserver')
  },
  emits: ['status'],
  setup(props, context) {
    const { cart, load, setCart } = useCart();
    const totalItems = computed(() => cartGetters.getTotalItems(cart.value));
    if (totalItems.value === 0) context.root.$router.push('/cart');

    const { providerList, getPaymentProviderList } = usePayment(String(cart.value?.order?.id));
    const { order, make, loading } = useMakeOrder();
    const th = useUiHelpers();

    const isPaymentReady = ref(false);
    const terms = ref(false);
    const selectedProvider = ref({});

    const selectProvider = (provider) => {
      isPaymentReady.value = false;
      selectedProvider.value = provider;
      context.emit('status');
    };

    onSSR(async () => {
      await load();
      await getPaymentProviderList();
    });

    const processOrder = async () => {
      // await make();

      // const thankYouPath = {
      //   name: 'thank-you',
      //   query: { order: orderGetters.getId(order.value) }
      // };
      // context.root.$router.push(context.root.localePath(thankYouPath));
      setCart(null);
    };

    const providerPaymentHandler = () => {};

    const cartExcedLimitTotalAmount = computed(() => cart?.value?.order?.amountTotal > 50000);

    const canFinishPayment = computed(() => !cartExcedLimitTotalAmount.value);

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
