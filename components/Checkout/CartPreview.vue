<template>
  <div>
    <div v-if="currentStep !== 'revieworder'">
      <div class="highlighted">
        <SfHeading
          :level="3"
          title="Totals"
          class="sf-heading--left sf-heading--no-underline title"
        />
      </div>
      <div class="highlighted">
        <SfProperty
          name="Products"
          :value="totalItems"
          class="sf-property--full-width sf-property--large property"
        />
        <SfProperty
          name="Subtotal"
          :value="$n(totals.subtotal, 'currency')"
          :class="[
            'sf-property--full-width',
            'sf-property--large property',
            { discounted: totals.special > 0 },
          ]"
        />
        <SfProperty
          v-for="discount in discounts"
          :key="discount.id"
          :name="discount.name + (discount.code && ` (${discount.code})`)"
          :value="$n(discount.value, 'currency')"
          class="sf-property--full-width sf-property--small"
        />
        <SfProperty
          v-if="totals.special > 0"
          :value="$n(totals.special, 'currency')"
          class="
            sf-property--full-width sf-property--small
            property
            special-price
          "
        />
        <SfProperty
          name="Shipping"
          :value="shippingMethodPrice ? shippingMethodPrice : 'Free'"
          class="sf-property--full-width sf-property--large property"
        />
        <SfProperty
          name="Total price"
          :value="$n(totals.total, 'currency')"
          class="
            sf-property--full-width sf-property--large
            property-total
            total-price
          "
        />
      </div>
    </div>
    <div v-else>
      <div class="highlighted">
        <SfHeading
          :level="3"
          title="Order Review"
          class="sf-heading--left sf-heading--no-underline title"
        />
      </div>
      <div class="highlighted pb-0">
        <div class="personal-detail flex justify-between">
          <div class="detail-adress grow">
            <p class="font-bold mb-4 text-lg">
              Personal details
            </p>
            <p class="mb-4">
              <span>{{ partnername }}</span> <br>Zielinskiego 30 – 41,
              53-345<br>
              Wroclaw, Poland
            </p>
            <p>sviatlana.example@gmail.com</p>
            <p class="mb-4">
              (00) 468 900 300
            </p>
          </div>
          <div class="detail-edit">
            <SfLink
              link="#"
              class="font-bold"
            >
              EDIT
            </SfLink>
          </div>
        </div>
        <div class="personal-detail flex justify-between">
          <div class="detail-adress grow">
            <p class="font-bold mb-4 text-lg">
              Shipping details
            </p>
            <p class="mb-4">
              GLS pakkeshop
            </p>
          </div>
          <div class="detail-edit">
            <SfLink
              link="#"
              class="font-bold"
            >
              EDIT
            </SfLink>
          </div>
        </div>
        <div
          class="
            personal-detail
            flex
            justify-between
            border-b-2 border-white
            rounded-none
          "
        >
          <div class="detail-adress grow">
            <p class="font-bold mb-4 text-lg">
              Billing address
            </p>
            <p class="mb-4">
              GLS pakkeshop
            </p>
          </div>
          <div class="detail-edit">
            <SfLink
              link="#"
              class="font-bold"
            >
              EDIT
            </SfLink>
          </div>
        </div>
      </div>
    </div>
    <div class="highlighted promo-code">
      <SfInput
        v-model="promoCode"
        data-cy="cart-preview-input_promoCode"
        name="promoCode"
        :label="$t('Enter promo code')"
        class="sf-input--filled promo-code__input total-input"
      />
      <SfButton
        class="promo-code__button"
        @click="() => applyCoupon({ couponCode: promoCode })"
      >
        {{ $t("Apply") }}
      </SfButton>
    </div>
    <div class="highlighted">
      <SfCharacteristic
        v-for="characteristic in characteristics"
        :key="characteristic.title"
        :title="characteristic.title"
        :description="characteristic.description"
        :icon="characteristic.icon"
        class="characteristic"
      />
    </div>
  </div>
</template>
<script>
import {
  SfHeading,
  SfButton,
  SfProperty,
  SfCharacteristic,
  SfInput,
  SfLink
} from '@storefront-ui/vue';
import { computed, ref } from '@nuxtjs/composition-api';
import { useCart, checkoutGetters, cartGetters } from '@vue-storefront/odoo';

export default {
  name: 'CartPreview',
  components: {
    SfHeading,
    SfButton,
    SfProperty,
    SfCharacteristic,
    SfInput,
    SfLink
  },
  setup(props, context) {
    const { cart, removeItem, updateItemQty, applyCoupon } = useCart();
    const currentStep = computed(() =>
      context.root.$route.path.split('/').pop()
    );
    const listIsHidden = ref(false);
    const promoCode = ref('');
    const showPromoCode = ref(false);
    const partnername = cart?.value?.order?.partnerShipping?.name;
    const products = computed(() => cartGetters.getItems(cart.value));
    const totalItems = computed(() => cartGetters.getTotalItems(cart.value));
    const totals = computed(() => cartGetters.getTotals(cart.value));
    const discounts = computed(() => cartGetters.getDiscounts(cart.value));
    const shippingMethodPrice = computed(() =>
      checkoutGetters.getShippingMethodPrice(cart.value)
    );

    return {
      currentStep,
      partnername,
      shippingMethodPrice,
      discounts,
      totalItems,
      listIsHidden,
      products,
      totals,
      promoCode,
      showPromoCode,
      removeItem,
      updateItemQty,
      checkoutGetters,
      cartGetters,
      applyCoupon,
      characteristics: [
        {
          title: 'Safety',
          description: 'It carefully packaged with a personal touch',
          icon: 'safety'
        },
        {
          title: 'Easy shipping',
          description:
            'You’ll receive dispatch confirmation and an arrival date',
          icon: 'shipping'
        },
        {
          title: 'Changed your mind?',
          description: 'Rest assured, we offer free returns within 30 days',
          icon: 'return'
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.highlighted {
  box-sizing: border-box;
  width: 100%;
  background-color: var(--c-light);
  padding: var(--spacer-xl) var(--spacer-xl) 0;
  @include for-mobile {
    padding: var(--spacer-xl) var(--spacer-lg) 0;
  }
  &:last-child {
    padding-bottom: var(--spacer-xl);
  }
}
.total-items {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacer-xl);
}
.property {
  margin-bottom: var(--spacer-base);
}
.property-total {
  margin-top: var(--spacer-xl);
  padding-top: var(--spacer-lg);
  font-size: var(--font-size-xl);
  border-top: var(--c-white) 1px solid;
  --property-name-font-weight: var(--font-weight--semibold);
  --property-name-color: var(--c-text);
}

.characteristic {
  &:not(:last-child) {
    margin-bottom: var(--spacer-lg);
  }
}
.promo-code {
  // display: flex;
  // align-items: flex-start;
  &__button {
    --button-width: 6.3125rem;
    --button-height: var(--spacer-lg);
  }
  &__input {
    --input-background: var(--c-white);
    flex: 1;
    border-radius: 100px !important;
  }
  position: relative;
}

.promo-code__button {
  position: absolute;
  top: 44px;
  right: 45px;
  background: #7ba393;
  font-size: 12px;
  color: #fff;
  font-weight: 500;
  border-radius: 100px;
  padding-top: 8px;
  padding-bottom: 8px;
}

::v-deep .promo-code input {
  border-radius: 100px;
  padding-top: 15px;
  padding-bottom: 11px;
}

::v-deep .promo-code .sf-input__label {
  font-weight: 400;
  font-size: 16px;
  color: #43464e;
  font-family: "Josefin Sans";
  padding-left: 22px;
}

.discounted {
  &::v-deep .sf-property__value {
    color: var(--c-danger);
    text-decoration: line-through;
  }
}

.special-price {
  justify-content: flex-end;

  &::v-deep .sf-property__name {
    display: none;
  }
}
</style>
