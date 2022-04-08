
<template>
  <div id="checkout">
    <div class="checkout">
      <div class="checkout__main">
        <SfSteps
          :active="currentStepIndex"
          :class="{ checkout__steps: true }"
        >
          <SfStep
            v-for="(step, key) in STEPS"
            :key="key"
            :name="step"
          >
            <nuxt-child @change="handleStepClick" />
          </SfStep>
        </SfSteps>
      </div>
      <div
        class="checkout__aside"
      >
        <transition name="fade">
          <CheckoutCartPreview key="order-summary" />
        </transition>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { SfSteps } from '@storefront-ui/vue';
import { computed } from '@nuxtjs/composition-api';
import { useRouter, useRoute, defineComponent } from '@nuxtjs/composition-api';

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
  middleware: 'checkout',
  setup() {
    const router = useRouter();
    const route = useRoute();

    const currentStep = computed(() =>
      route.value.path?.split('/').pop()
    );
    const currentStepIndex = computed(() =>
      Object.keys(STEPS).findIndex((s) => s === currentStep.value)
    );
    const handleStepClick = (step) => {
      router.push(`/checkout/${step}`);
    };
    return {
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
