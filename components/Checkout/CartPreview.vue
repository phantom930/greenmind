<template>
  <div class="py-5">
    <div v-if="currentStep !== 'revieworder'">
      <div class="highlighted mb-5">
        <SfHeading
          :level="3"
          :title="$t('Totals')"
          class="sf-heading--left sf-heading--no-underline title"
        />
      </div>
      <div class="highlighted">
        <SfProperty
          :name="$t('Products')"
          :value="totalItems"
          class="sf-property--full-width sf-property--large property"
        />

        <SfProperty
          :name="$t('Subtotal')"
          :value="$currency(totals.subtotal)"
          :class="[
            'sf-property--full-width',
            'sf-property--large property',
            { discounted: totals.special > 0 },
          ]"
        />
        <SfProperty
          v-if="shippingMethodPrice > 0"
          :name="$t('Shipping')"
          :value="$currency(shippingMethodPrice)"
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
          :value="$currency(discount.value)"
          class="sf-property--full-width sf-property--small"
        />
        <SfProperty
          v-if="totals.special > 0"
          :value="$currency(totals.special)"
          class="
            sf-property--full-width sf-property--small
            property
            special-price
          "
        />
        <SfProperty
          v-if="!isPersonalOrShippingPage"
          :name="$t('Shipping')"
          :value="shippingMethodPrice ? $currency(shippingMethodPrice) : $t('Free')"
          class="sf-property--full-width sf-property--large property"
        />

        <SfProperty
          :name="$t('Total price')"
          :value="$currency(totals.total)"
          class="
            sf-property--full-width sf-property--large
            property-total
            total-price
          "
        />

        <slot name="extra-middle" />
      </div>
    </div>
    <div v-else>
      <div class="highlighted">
        <SfHeading
          :level="3"
          :title="$t('Order Review')"
          class="sf-heading--left sf-heading--no-underline title"
        />
      </div>
      <div class="highlighted pb-0">
        <div class="personal-detail flex justify-between">
          <div class="detail-adress grow">
            <p class="font-bold mb-4 text-lg">
              {{ $t('Personal details') }}
            </p>
            <p class="mb-4">
              <span>{{ partner.name }}</span> <br>
            </p>
            <p>{{ partner.email }}</p>
            <p class="mb-4">
              {{ partner.phone }}
            </p>
          </div>
          <div class="detail-edit">
            <SfLink
              :link="{ name: 'personaldetails' }"
              class="font-bold"
            >
              {{ $t('EDIT') }}
            </SfLink>
          </div>
        </div>
        <div class="personal-detail flex justify-between">
          <div class="detail-adress grow">
            <p class="font-bold mb-4 text-lg">
              {{ $t('Shipping details') }}
            </p>
            <p class="mb-4">
              <span>{{ partnerShipping.name }}</span> <br>
              <span v-if="partnerShipping.street">{{ partnerShipping.street }}</span><br v-if="partnerShipping.street2">
              <span v-if="partnerShipping.street2">{{ partnerShipping.street2 }}</span><br>
              <span>{{ partnerShipping.zip }} </span>
              <span v-if="partnerShipping.city">{{ partnerShipping.city }}</span>
            </p>
          </div>
          <div class="detail-edit">
            <SfLink
              :link="{ name: 'shipping' }"
              class="font-bold"
            >
              {{ $t('EDIT') }}
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
              {{ $t('Billing address') }}
            </p>
            <p class="mb-4">
              <span>{{ partnerInvoice.name }}</span> <br>
              <span v-if="partnerInvoice.street">{{ partnerInvoice.street }}</span><br v-if="partnerInvoice.street2">
              <span v-if="partnerInvoice.street2">{{ partnerInvoice.street2 }}</span><br>
              <span>{{ partnerInvoice.zip }} </span>
              <span v-if="partnerInvoice.city">{{ partnerInvoice.city }}</span>
            </p>
          </div>
          <div class="detail-edit">
            <SfLink
              :link="{ name: 'shipping' }"
              class="font-bold"
            >
              {{ $t('EDIT') }}
            </SfLink>
          </div>
        </div>
      </div>
    </div>
    <div class="highlighted promo-code text-center mt-5">
      <span class="mb-3 text-fern-secondary underline cursor-pointer" @click="showCoupon = !showCoupon">{{ $t('Use coupon') }}</span>

      <transition-group
        name="sf-fade"
        mode="out-in"
        type="transition"
        tag="div"
        style="max-height: 45px"
      >
        <template v-if="showCoupon">
          <SfInput
            key="input"
            v-model="couponCode"
            data-cy="cart-preview-input_promoCode"
            name="couponCode"
            :label="$t('Enter Coupon code')"
            class="sf-input--filled promo-code__input total-input mt-5 text-left"
          />
          <GreenButton
            key="button"
            class="promo-code__button"
            :disabled="loadingCoupon || !couponCode"
            :loading="loadingCoupon"
            style-type="Primary"
            color="Grey"
            shape="Round"
            @click="handleAddCouponCode"
          >
            <span>{{ $t("Apply") }}</span>
          </GreenButton>
        </template>
      </transition-group>
    </div>
    <!-- <div class="highlighted promo-code text-center mb-8 mt-5">
      <span class="mb-3 text-fern-secondary underline cursor-pointer" @click="showGiftCard = !showGiftCard">{{ $t('Pay with gift card') }}</span>
      <transition-group
        name="sf-fade"
        mode="out-in"
        type="transition"
        tag="div"
        style="max-height: 45px"
      >
        <template v-if="showGiftCard">
          <SfInput
            key="input"
            v-model="giftCode"
            data-cy="cart-preview-input_promoCode"
            name="promoCode"
            :label="$t('Enter Gift code')"
            class="sf-input--filled promo-code__input total-input mt-5 text-left"
          />
          <GreenButton
            key="button"
            class="promo-code__button"
            :disabled="loading || !giftCode"
            :loading="loading"
            style-type="Primary"
            color="Grey"
            shape="Round"
            @click="handleAddGiftCard"
          >
            <span>{{ $t("Apply") }}</span>
          </GreenButton>
        </template>
      </transition-group>
    </div> -->
    <div class="highlighted pt-10">
      <SfCharacteristic
        v-for="characteristic in characteristics"
        :key="characteristic.title"
        :title="$t(characteristic.title)"
        :description="$t(characteristic.description)"
        :icon="characteristic.icon"
        class="characteristic"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { SfHeading, SfProperty, SfCharacteristic, SfLink, SfInput } from '@storefront-ui/vue';
import { computed, ref, defineComponent, useRoute } from '@nuxtjs/composition-api';
import { useCart, checkoutGetters } from '@vue-storefront/odoo';
import { cartGetters, useGiftCard, useUiNotification, useCoupon } from '~/composables';

export default defineComponent({
  name: 'CartPreview',
  components: {
    SfHeading,
    SfProperty,
    SfCharacteristic,
    SfLink,
    SfInput
  },
  setup(props, context) {
    const { cart, load, setCart } = useCart();
    const { applyGiftCard, loading, error } = useGiftCard();
    const { applyCoupon, loading: loadingCoupon, error: errorCoupon } = useCoupon();
    const { name } = useRoute().value;
    const { send } = useUiNotification();

    const currentStep = computed(() =>
      context.root.$route.path.split('/').pop()
    );
    const listIsHidden = ref(false);
    const showGiftCard = ref(false);
    const showCoupon = ref(false);
    const promoCodeAdded = ref(false);
    const giftCode = ref('');
    const couponCode = ref('');
    const showPromoCode = ref(false);
    const partner = computed(() => cart?.value?.order?.partner || {});
    const partnerShipping = computed(() => cart?.value?.order?.partnerShipping || {});
    const partnerInvoice = computed(() => cart?.value?.order?.partnerInvoice || {});
    const products = computed(() => cartGetters.getItems(cart.value));
    const totalItems = computed(() => cartGetters.getTotalItems(cart.value));
    const totals = computed(() => cartGetters.getTotals(cart.value));
    const discounts = computed(() => cartGetters.getDiscounts(cart.value));
    const shippingMethodPrice = computed(() =>
      checkoutGetters.getShippingMethodPrice(cart.value?.order?.shippingMethod)
    );

    const isPersonalOrShippingPage = computed(() => ['personaldetails', 'shipping'].includes(name));

    const handleAddGiftCard = async () => {
      await applyGiftCard(giftCode.value);

      if (error.value) {
        send({ message: error.value, type: 'danger' });
        error.value = null;
        return;
      }
      setCart(null);
      await load({ customQuery: { cartLoad: 'greenCartLoad' } });
      promoCodeAdded.value = true;
    };

    const handleAddCouponCode = async () => {
      await applyCoupon(couponCode.value);

      if (errorCoupon.value) {
        send({ message: errorCoupon.value, type: 'danger' });
        errorCoupon.value = null;
        return;
      }
      setCart(null);
      await load({ customQuery: { cartLoad: 'greenCartLoad' } });
    };

    const handleRemoveGiftCard = () => {

    };

    return {
      showCoupon,
      handleAddCouponCode,
      showGiftCard,
      handleRemoveGiftCard,
      promoCodeAdded,
      isPersonalOrShippingPage,
      loadingCoupon,
      cart,
      handleAddGiftCard,
      loading,
      currentStep,
      partner,
      partnerShipping,
      partnerInvoice,
      shippingMethodPrice,
      discounts,
      totalItems,
      listIsHidden,
      products,
      totals,
      giftCode,
      couponCode,
      showPromoCode,
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
});
</script>

<style lang="scss" scoped>
@import '~/assets/css/cartPreview.scss';
</style>
