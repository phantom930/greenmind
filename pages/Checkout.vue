
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
          <SfStep v-for="(step, key) in STEPS" :key="key" :name="step">
            <nuxt-child />
          </SfStep>
        </SfSteps>
        <nuxt-child v-else />
      </div>
      <div v-if="!isThankYou && currentStepIndex!=2" class="checkout__aside desktop-only">
        <transition name="fade">
          <CartPreview key="order-summary" />
        </transition>
      </div>
      <div v-else class="checkout__aside desktop-only">
        <transition name="fade">
          <div class="gray-card">
            <div class="card-title">Order Review</div>
            <div class="personal-details">
              <div class="title">
                <p>Personal details</p>
                <a href="#">EDIT</a>
              </div>
              <p class="info name">Sviatlana Havaka</p>
              <p class="info address">Zielinskiego 30 – 41, 53-345</p>
              <p class="info city">Wroclaw, Poland</p>
              <p class="info email">sviatlana.example@gmail.com</p>
              <p class="info phone">(00) 468 900 300</p>
            </div>
            <div class="shipping-details">
              <div class="title">
                <p>Shipping details</p>
                <a href="#">EDIT</a>
              </div>
              <p class="info">GLS pakkeshop</p>
            </div>
            <div class="billing-address">
              <div class="title">
                <p>Billing address</p>
                <a href="#">EDIT</a>
              </div>
              <p class="info">Same as shipping address</p>
            </div>
            <div class="input-btn-wrap">
              <input type="text" placeholder="Enter promo code">
              <a href="#">APPLY</a>
            </div>
            <div class="group">
              <img :src="require('/assets/images/checkout/safety.png')">
              <div class="text">
                <div class="title">Safety</div>
                <p>It carefully packaged with a personal touch</p>
              </div>
            </div>
            <div class="group">
              <img :src="require('/assets/images/checkout/shipping.png')">
              <div class="text">
                <div class="title">Easy shipping</div>
                <p>You’ll receive dispatch confirmation and an arrival date</p>
              </div>
            </div>
            <div class="group">
              <img :src="require('/assets/images/checkout/return.png')">
              <div class="text">
                <div class="title">Changed your mind?</div>
                <p>Rest assured, we offer free returns within 30 days</p>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import { SfSteps, SfButton } from "@storefront-ui/vue";
import CartPreview from "~/components/Checkout/CartPreview";
import { computed } from "@nuxtjs/composition-api";
const STEPS = {
  personaldetails: "Personal details",
  shipping: "Shipping",
  // billing: "Billing",
  revieworder: "Review Order",
  payment: "Payment",
};
export default {
  name: "Checkout",
  components: {
    SfButton,
    SfSteps,
    CartPreview,
  },
  setup(props, context) {
    const currentStep = computed(() =>
      context.root.$route.path.split("/").pop()
    );
    const currentStepIndex = computed(() =>
      Object.keys(STEPS).findIndex((s) => s === currentStep.value)
    );
    const isThankYou = computed(() => currentStep.value === "thank-you");
    const handleStepClick = (stepIndex) => {
      const key = Object.keys(STEPS)[stepIndex];
      context.root.$router.push(`/checkout/${key}`);
    };
    return {
      handleStepClick,
      STEPS,
      currentStepIndex,
      isThankYou,
      currentStep,
    };
  },
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

::v-deep .gray-card {
  padding-left: 55px;
  padding-right: 55px;
  font-family: "Josefin Sans";
  padding-bottom: 25px;
}

::v-deep .gray-card .card-title {
  color: #1D1F22;
  font-size: 26px;
  font-weight: 500;
  padding-bottom: 40px;
  padding-top: 40px;
}

::v-deep .personal-details .title {
  font-size: 18px;
  font-weight: 400;
  color: #1D1F22;
}

::v-deep .shipping-details a {
  font-size: 14px;
  font-weight: 500;
  color: #1D1F22;
  text-decoration: underline;
}

::v-deep .shipping-details {
  padding-top: 14px;
}

::v-deep .billing-address {
  padding-top: 14px;
  padding-bottom: 34px;
  border-bottom: 1px solid #fff;
  margin-bottom: 32px;
}

::v-deep .personal-details a {
  font-size: 14px;
  font-weight: 500;
  color: #1D1F22;
  text-decoration: underline;
}

::v-deep .billing-address a {
  font-size: 14px;
  font-weight: 500;
  color: #1D1F22;
  text-decoration: underline;
}

.personal-details .title, .shipping-details .title, .billing-address .title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 13px;
}

::v-deep .gray-card .info {
  font-size: 18px;
  font-weight: 300;
  color: #43464E;
}

::v-deep .gray-card .input-btn-wrap {
  position: relative;
  margin-bottom: 40px;
}

::v-deep .gray-card .input-btn-wrap a {
  position: absolute;
  right: 4px;
  top: 4px;
  font-size: 12px;
  font-weight: 500;
  background: #7BA393;
  color: #fff;
  width: 100%;
  max-width: 100px;
  text-align: center;
  padding-top: 5px;
  padding-bottom: 2px;
  border-radius: 100px;
}

::v-deep .gray-card .input-btn-wrap input {
  width: 100%;
  height: 33px;
  padding-left: 32px;
  border-radius: 100px;
}

::v-deep .gray-card .group {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

::v-deep .group .title {
  font-size: 18px;
  font-weight: 400;
  color: #1D1F22;
}

::v-deep .group p {
  font-size: 14px;
  font-weight: 400;
  color: #72757E;
}

::v-deep .group .text {
  padding-left: 8px;
}
</style>
