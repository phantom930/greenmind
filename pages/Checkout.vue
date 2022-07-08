
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
  layout: 'checkout',
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
    const handleStepByNumber = (stepNumber) => {
      const stepNameIndex = Object.keys(STEPS)[stepNumber];

      router.push({ name: stepNameIndex});
    };

    return {
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
