<template>
  <div class="pb-5">
    <div v-if="currentStep !== 'revieworder'">
      <div class="highlighted">
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
    <!-- <div class="highlighted promo-code">
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
    </div> -->
    <div class="highlighted">
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
import { SfHeading, SfProperty, SfCharacteristic, SfLink } from '@storefront-ui/vue';
import { computed, ref, defineComponent, useRoute } from '@nuxtjs/composition-api';
import { useCart, checkoutGetters } from '@vue-storefront/odoo';
import { cartGetters } from '~/composables';

export default defineComponent({
  name: 'CartPreview',
  components: {
    SfHeading,
    SfProperty,
    SfCharacteristic,
    SfLink
  },
  setup(props, context) {
    const { cart, applyCoupon } = useCart();
    const { name } = useRoute().value;
    const currentStep = computed(() =>
      context.root.$route.path.split('/').pop()
    );
    const listIsHidden = ref(false);
    const promoCode = ref('');
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

    return {
      isPersonalOrShippingPage,
      cart,
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
      promoCode,
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
