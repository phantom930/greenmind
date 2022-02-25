
<template>
  <div id="checkout">
    <div class="checkout">
      <div class="checkout__main">
        <SfSteps
          v-if="!isThankYou"
          :active="currentStepIndex"
          :class="{ checkout__steps: true }"
          @change="handleStepClick"
        >
          <SfStep
            v-for="(step, key) in STEPS"
            :key="key"
            :name="step"
          >
            <nuxt-child />
          </SfStep>
        </SfSteps>
        <nuxt-child v-else />
      </div>
      <div
        v-if="!isThankYou"
        class="checkout__aside desktop-only"
      >
        <transition name="fade">
          <CartPreview key="order-summary" />
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import { SfSteps, SfButton } from '@storefront-ui/vue';
import CartPreview from '~/components/Checkout/CartPreview';
import { computed } from '@nuxtjs/composition-api';
const STEPS = {
  personaldetails: 'Personal details',
  shipping: 'Shipping',
  // billing: "Billing",
  revieworder: 'Review Order',
  payment: 'Payment'
};
export default {
  name: 'Checkout',
  components: {
    SfButton,
    SfSteps,
    CartPreview
  },
  setup(props, context) {
    const currentStep = computed(() =>
      context.root.$route.path.split('/').pop()
    );
    const currentStepIndex = computed(() =>
      Object.keys(STEPS).findIndex((s) => s === currentStep.value)
    );
    const isThankYou = computed(() => currentStep.value === 'thank-you');
    const handleStepClick = (stepIndex) => {
      const key = Object.keys(STEPS)[stepIndex];
      context.root.$router.push(`/checkout/${key}`);
    };
    return {
      handleStepClick,
      STEPS,
      currentStepIndex,
      isThankYou,
      currentStep
    };
  }
};
</script>

<style lang="scss" scoped>
#checkout {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: 0 auto;
  }
}
.checkout {
  @include for-desktop {
    display: flex;
  }
  &__main {
    @include for-desktop {
      flex: 1;
      padding: var(--spacer-xl) 0 0 0;
    }
  }
  &__aside {
    @include for-desktop {
      flex: 0 0 25.5rem;
      margin: 0 0 0 4.25rem;
    }
  }
  &__steps {
    --steps-content-padding: 0 var(--spacer-base);
    @include for-desktop {
      --steps-content-padding: 0;
    }
    &-auth::v-deep .sf-steps__step:first-child {
      --steps-step-color: #e8e4e4;
    }
  }
}

::v-deep .sf-steps__step {
  color: #8D8F9A;
  font-size: 18px;
  font-family: "Josefin Sans";
}

::v-deep .checkout__aside div {
  background: #F1F2F3;
  border-radius: 14px;
}

::v-deep .checkout__aside .sf-property__name {
  font-size: 18px;
  font-weight: 400;
  font-family: "Josefin Sans";
}

::v-deep .checkout__aside .sf-property__value {
  font-size: 20px;
  font-weight: 700;
}

::v-deep .checkout__aside .total-price .sf-property__name {
  font-size: 20px;
  font-weight: 700;
}

::v-deep .checkout__aside .sf-characteristic__title {
  font-size: 18px;
  font-weight: 400px;
  font-family: "Josefin Sans";
}

::v-deep .checkout__aside .sf-characteristic__description {
  font-size: 14px;
  font-weight: 400;
  color: #72757E;
  font-family: "Josefin Sans";
}

::v-deep .checkout__aside {
  max-width: 452px;
  width: 100%;
  margin-left: 20px;
  margin-top: 42px;
}
</style>
