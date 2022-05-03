<template>
  <div class="pb-5">
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
          name="Shipping"
          :value="shippingMethodPrice ? shippingMethodPrice : 'Free'"
          class="sf-property--full-width sf-property--large property"
        />
        <SfProperty
          name="Total price"
          :value="$currency(totals.total)"
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
              <span>{{ partner.name }}</span> <br>{{ partner.street }} –
              {{ partner.zip }}<br>
              {{ partner.city }}, {{ partner.country ? partner.country.name : '' }}
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
              <span>{{ partnerShipping.name }}</span> <br>{{ partnerShipping.street }} –
              {{ partnerShipping.zip }}<br>
              {{ partnerShipping.city }}, {{ partnerShipping.country ? partnerShipping.country.name : '' }}
            </p>
          </div>
          <div class="detail-edit">
            <SfLink
              :link="{ name: 'shipping' }"
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
              <span>{{ partnerInvoice.name }}</span> <br>{{ partnerInvoice.street }} –
              {{ partnerInvoice.zip }}<br>
              {{ partnerInvoice.city }}, {{ partnerInvoice.country ? partnerInvoice.country.name : '' }}
            </p>
          </div>
          <div class="detail-edit">
            <SfLink
              :link="{ name: 'shipping' }"
              class="font-bold"
            >
              EDIT
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
        :title="characteristic.title"
        :description="characteristic.description"
        :icon="characteristic.icon"
        class="characteristic"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { SfHeading, SfProperty, SfCharacteristic, SfLink } from '@storefront-ui/vue';
import { computed, ref, defineComponent } from '@nuxtjs/composition-api';
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
    const { cart, removeItem, updateItemQty, applyCoupon } = useCart();
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

    return {
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
});
</script>

<style lang="scss" scoped>
@import '~/assets/css/cartPreview.scss';
</style>
