<template>
  <div class="payment-page">
    <h3 class="title">
      Payment Methods
    </h3>
    <div class="payment-method">
      <div class="method">
        <label class="container">
          <input
            type="checkbox"
            checked="checked"
          >
          <span class="checkmark" />
        </label>
        <img :src="require('/assets/images/payment/visa.png')">
      </div>
      <div class="method">
        <label class="container">
          <input
            type="checkbox"
            checked="checked"
          >
          <span class="checkmark" />
        </label>
        <img :src="require('/assets/images/payment/master.png')">
      </div>
      <div class="method">
        <label class="container">
          <input
            type="checkbox"
            checked="checked"
          >
          <span class="checkmark" />
        </label>
        <img :src="require('/assets/images/payment/visae.png')">
      </div>
      <div class="method">
        <label class="container">
          <input
            type="checkbox"
            checked="checked"
          >
          <span class="checkmark" />
        </label>
        <p>Cash on delivery</p>
      </div>
      <div class="method">
        <label class="container">
          <input
            type="checkbox"
            checked="checked"
          >
          <span class="checkmark" />
        </label>
        <p>Check</p>
      </div>
    </div>
    <div class="form-wrap">
      <form action="">
        <SfInput
          value=""
          label="Card number"
          name="number"
          type="text"
          :icon="{ icon: '', color: '', size: '' }"
          valid
          error-message="Error message value of form input. It appears if `valid` is `false`."
          :required="false"
          :disabled="false"
          :has-show-password="false"
        />
        <SfInput
          value=""
          label="Card holder"
          name="name"
          type="text"
          :icon="{ icon: '', color: '', size: '' }"
          valid
          error-message="Error message value of form input. It appears if `valid` is `false`."
          :required="false"
          :disabled="false"
          :has-show-password="false"
        />
      </form>
      <div class="expire-wrap">
        <p>Expiry date:</p>
        <div class="select-wrap">
          <SfSelect
            class="sf-select--underlined first"
            label="Month"
            :required="false"
            valid
            :disabled="false"
            error-message="This field is not correct."
            value=""
            placeholder=""
          >
            <SfSelectOption value="amaranth">
              Amaranth
            </SfSelectOption>
            <SfSelectOption value="amber">
              Amber
            </SfSelectOption>
            <SfSelectOption value="arctic-lime">
              Arctic lime
            </SfSelectOption>
            <SfSelectOption value="bluetiful">
              Bluetiful
            </SfSelectOption>
            <SfSelectOption value="buff">
              Buff
            </SfSelectOption>
          </SfSelect>
          <SfSelect
            class="sf-select--underlined"
            label="Year"
            :required="false"
            valid
            :disabled="false"
            error-message="This field is not correct."
            value=""
            placeholder=""
          >
            <SfSelectOption value="amaranth">
              Amaranth
            </SfSelectOption>
            <SfSelectOption value="amber">
              Amber
            </SfSelectOption>
            <SfSelectOption value="arctic-lime">
              Arctic lime
            </SfSelectOption>
            <SfSelectOption value="bluetiful">
              Bluetiful
            </SfSelectOption>
            <SfSelectOption value="buff">
              Buff
            </SfSelectOption>
          </SfSelect>
        </div>
      </div>
      <div class="cvc-code-wrap">
        <SfInput
          value=""
          label="Code CVC"
          name="name"
          type="text"
          :icon="{ icon: '', color: '', size: '' }"
          valid
          error-message="Error message value of form input. It appears if `valid` is `false`."
          :required="false"
          :disabled="false"
          :has-show-password="false"
        />
        <a href="#">WHERE CAN I FIND CVC CODE?</a>
      </div>
      <div class="checkbox-wrap">
        <GreenCheckbox />
        <p class="label">
          Save this card for other purchases.
        </p>
      </div>
      <button
        class="color-primary sf-button confirm-btn"
        :aria-disabled="false"
        :link="null"
        type="button"
      >
        CONFIRM & PAY
      </button>
    </div>
  </div>
</template>

<script>
import {
  // SfHeading,
  // SfTable,
  // SfCheckbox,
  // SfButton,
  // SfDivider,
  // SfImage,
  // SfIcon,
  // SfPrice,
  // SfProperty,
  // SfAccordion,
  // SfLink,
  // SfRadio,
  SfInput,
  SfSelect
} from '@storefront-ui/vue';
import { onSSR } from '@vue-storefront/core';
import { useUiHelpers } from '~/composables';

import { ref, computed } from '@vue/composition-api';
import {
  useMakeOrder,
  useCart,
  cartGetters,
  orderGetters,
  usePayment
} from '@vue-storefront/odoo';

export default {
  name: 'ReviewOrder',
  components: {
    // SfHeading,
    // SfTable,
    // SfCheckbox,
    // SfButton,
    // SfDivider,
    // SfImage,
    // SfIcon,
    // SfPrice,
    // SfProperty,
    // SfAccordion,
    // SfLink,
    // SfRadio,
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
    const { providerList, getPaymentProviderList } = usePayment();
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
      await make();

      const thankYouPath = {
        name: 'thank-you',
        query: { order: orderGetters.getId(order.value) }
      };
      context.root.$router.push(context.root.localePath(thankYouPath));
      setCart(null);
    };

    const providerPaymentHandler = () => {};

    const providerListHasMoreThanOne = computed(
      () => providerList.value.length > 1
    );

    return {
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
};
</script>

<style lang="scss" scoped>
.title {
  margin: var(--spacer-xl) 0 var(--spacer-base) 0;
}
.table {
  margin: 0 0 var(--spacer-base) 0;
  &__row {
    justify-content: space-between;
  }
  @include for-desktop {
    &__header {
      text-align: center;
      &:last-child {
        text-align: right;
      }
    }
    &__data {
      text-align: center;
    }
    &__description {
      text-align: left;
      flex: 0 0 12rem;
    }
    &__image {
      --image-width: 5.125rem;
      text-align: left;
      margin: 0 var(--spacer-xl) 0 0;
    }
  }
}
.product-sku {
  color: var(--c-text-muted);
  font-size: var(--font-size--sm);
}
.price {
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
}
.product-price {
  --price-font-size: var(--font-size--base);
}
.summary {
  &__terms {
    margin: var(--spacer-base) 0 0 0;
  }
  &__total {
    margin: 0 0 var(--spacer-sm) 0;
    flex: 0 0 16.875rem;
  }
  &__action {
    @include for-desktop {
      display: flex;
      margin: var(--spacer-xl) 0 0 0;
    }
  }
  &__action-button {
    margin: 0;
    width: 100%;
    margin: var(--spacer-sm) 0 0 0;
    @include for-desktop {
      margin: 0 var(--spacer-xl) 0 0;
      width: auto;
    }
    &--secondary {
      @include for-desktop {
        text-align: right;
      }
    }
  }
  &__back-button {
    margin: var(--spacer-xl) 0 0 0;
    width: 100%;
    @include for-desktop {
      margin: 0 var(--spacer-xl) 0 0;
      width: auto;
    }
    color: var(--c-white);
    &:hover {
      color: var(--c-white);
    }
  }
  &__property-total {
    margin: var(--spacer-xl) 0 0 0;
  }
}
.property {
  margin: 0 0 var(--spacer-sm) 0;
  &__name {
    color: var(--c-text-muted);
  }
}
.accordion {
  margin: 0 0 var(--spacer-xl) 0;
  &__item {
    display: flex;
    align-items: flex-start;
  }
  &__content {
    flex: 1;
  }
  &__edit {
    flex: unset;
  }
}
.content {
  margin: 0 0 var(--spacer-xl) 0;
  color: var(--c-text);
  &:last-child {
    margin: 0;
  }
  &__label {
    font-weight: var(--font-weight--normal);
  }
}

.payment-page {
  margin-bottom: 651px;
}

.payment-page .form-wrap {
  max-width: 610px;
}

::v-deep .sf-input__wrapper .sf-input__label {
  font-size: 18px;
  font-weight: 300;
  color: #43464e;
  padding-left: 5px;
}

.payment-page .title {
  font-size: 34px;
  font-weight: 700;
  color: #1d1f22;
  margin-bottom: 40px;
}

.expire-wrap p {
  font-size: 18px;
  font-weight: 400;
  color: #43464e;
  padding-bottom: 8px;
}

.payment-page .expire-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

::v-deep .sf-select__dropdown {
  width: 216px;
}

::v-deep .sf-select--underlined.first {
  padding-right: 20px;
}

::v-deep .sf-select--underlined label {
  font-weight: 400;
  font-size: 16px;
  color: #43464e;
}

.payment-page .expire-wrap .select-wrap {
  display: flex;
  align-items: center;
}

.payment-page .form-wrap .sf-input input {
  padding-left: 10px;
}

.cvc-code-wrap {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
}

.cvc-code-wrap a {
  font-size: 14px;
  font-weight: 500;
  color: #0468db;
  text-decoration: underline;
}

::v-deep .cvc-code-wrap input {
  width: 216px;
}

.checkbox-wrap {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
}

.checkbox-wrap .label {
  padding-left: 8px;
}

.checkbox-wrap .general_wrapper {
  display: none;
}

::v-deep .confirm-btn {
  background: #32463d;
  color: #fff;
  border-radius: 100px;
  font-size: 14px;
  padding-top: 18px;
  font-weight: 500;
  max-width: 218px;
  width: 100%;
}

::v-deep .img-description-wrap {
  display: none;
}

/* Customize the label (the container) */
.container {
  display: block;
  position: relative;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: 25px;
  height: 25px;
  margin-right: 8px;
}

/* Hide the browser's default radio button */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom radio button */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
  border-radius: 50%;
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the radio button is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: #5ece7b;
}

/* Create the indicator (the dot/circle - hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the indicator (dot/circle) when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the indicator (dot/circle) */
.container .checkmark:after {
  top: 9px;
  left: 9px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: white;
}

.payment-method .method {
  display: flex;
  align-items: center;
}

.payment-method {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 21px;
  padding-bottom: 21px;
  border-top: 2px solid #f1f2f3;
  border-bottom: 2px solid #f1f2f3;
  margin-bottom: 40px;
}
</style>
