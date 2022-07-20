
<template>
  <div class="checkout mb-10">
    <div class="checkout__main">
      <SfSteps
        :active="currentStepIndex"
        :class="{ checkout__steps: true }"
        @change="handleStepByNumber"
      >
        <SfStep
          v-for="(step, key) in STEPS"
          :key="key"
          :name="$t(step)"
        >
          <nuxt-child @change="handleStepClick" />
        </SfStep>
      </SfSteps>
    </div>
    <div
      class="checkout__aside"
    >
      <transition name="fade">
        <LazyCheckoutCartPreview key="order-summary" />
      </transition>
    </div>
  </div>
</template>
<script >
import { SfSteps } from '@storefront-ui/vue';
import { useCart } from '@vue-storefront/odoo';
import { usePartner } from '~/composables';
import { computed, useRouter, useRoute, defineComponent, onMounted } from '@nuxtjs/composition-api';
import { setTrackBeginCheckout } from "~/resources/tracking";

const STEPS = {
  personaldetails: 'Personal details',
  shipping: 'Shipping',
  revieworder: 'Review Order',
  payment: 'Payment'
};

export default defineComponent({
  name: 'Checkout',
  components: {
    SfSteps
  },
  layout: 'checkout',
  setup() {
    const router = useRouter();
    const route = useRoute();
    const { load, cart, setCart } = useCart();
    const { partner } = usePartner();

    partner.value.name = cart?.value?.order?.partnerShipping?.name || null;
    partner.value.email = cart?.value?.order?.partnerShipping?.email || null;

    const currentStep = computed(() =>
      route.value.path?.split('/').pop()
    );
    const currentStepIndex = computed(() =>
      Object.keys(STEPS).findIndex((s) => s === currentStep.value)
    );

    const hasPartnerShipping = computed(() =>
      cart.value?.order?.partnerShipping?.id !== null &&
      cart.value?.order?.partnerShipping?.email !== null &&
      cart.value?.order?.partnerShipping?.country !== null &&
      cart.value?.order?.partnerShipping?.name !== null
    );

    const hasPartnerInvoice = computed(() =>
      cart.value?.order?.partnerInvoice?.id !== null &&
      cart.value?.order?.partnerInvoice?.email !== null &&
      cart.value?.order?.partnerInvoice?.country !== null &&
      cart.value?.order?.partnerInvoice?.name !== null
    );

    const partnerIsSaved = computed(() => partner?.value?.name && !partner?.value?.name?.toUpperCase()?.includes('PUBLIC'));

    const handleStepClick = async(step) => {
      setCart(null);
      await load({ customQuery: { cartLoad: 'greenCartLoadUpdate' } });

      if (!partnerIsSaved.value) {
        return;
      }

      if (step === 'revieworder' && (!hasPartnerShipping.value || !hasPartnerInvoice.value)) {
        return;
      }

      if (step === 'payment' && (!hasPartnerShipping.value || !hasPartnerInvoice.value) && !partnerIsSaved.value) {
        return;
      }
      router.push(`/checkout/${step}`);
    };

    const handleStepByNumber = async (stepNumber) => {
      const stepNameIndex = Object.keys(STEPS)[stepNumber];
      if (!partnerIsSaved.value) {
        return;
      }

      if (stepNameIndex === 'revieworder' && (!hasPartnerShipping.value || !hasPartnerInvoice.value)) {
        return;
      }

      if (stepNameIndex === 'payment' && (!hasPartnerShipping.value || !hasPartnerInvoice.value) && (partner === null || !partner?.value?.name || !partner?.value?.email)) {
        return;
      }

      setCart(null);
      await load({ customQuery: { cartLoad: 'greenCartLoadUpdate' } });

      router.push({ name: stepNameIndex});
    };

    onMounted(() => {
      if(currentStepIndex.value == 0) {
        const products = cart.value.order.orderLines?.map((orderLine) => orderLine)
        if(products && products.length > 0) {
          setTrackBeginCheckout(cart.value.order.amountTotal, products)
        }
      }
    });

    return {
      cart,
      hasPartnerInvoice,
      hasPartnerShipping,
      partner,
      partnerIsSaved,
      handleStepByNumber,
      handleStepClick,
      STEPS,
      currentStepIndex,
      currentStep
    };
  }
});
</script>

<style lang="scss" scoped>
@import '~/assets/css/checkout.scss';
</style>
