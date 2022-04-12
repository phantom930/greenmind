<template>
  <div>
    <SfHeading
      :level="3"
      :title="$t('Shipping Details')"
      class="sf-heading--left sf-heading--no-underline title"
    />

    <CheckoutUserShippingAddresses
      v-show="showAdresses"
      v-model="defaultShippingAddress"
      :current-address-id="currentAddressId || ''"
      :addresses="userShipping"
      @set-current-address="handleSetCurrentAddress"
    />

    <GreenButton
      v-show="!canAddNewAddress"
      type="Tertiary"
      color="Grey"
      shape="Round"
      size="Medium"
      :disabled="loading"
      :loading="loading"
      @click="canAddNewAddress = true"
    >
      {{ $t("Add new address") }}
    </GreenButton>

    <SfHeading
      :level="3"
      :title="$t('Select shipping method')"
      class="sf-heading--left sf-heading--no-underline title"
    />

    <CheckoutAddressForm
      v-if="canAddNewAddress"
      :loading="loading"
      :countries="countries"
      class="mb-5"
      @submit="handleAddNewAddress"
    />

    <VsfShippingProvider
      name="selectedMethodShipping"
      :selected-shipping-method-id="selectedShippingMethod.id"
    />

    <SfHeading
      :level="3"
      :title="$t('Billing details')"
      class="sf-heading--left sf-heading--no-underline title"
    />

    <CheckoutAddressForm
      v-if="canAddNewBillingAddress"
      :loading="loading"
      :countries="countries"
      class="mb-5"
      @submit="handleAddNewBillingAddress"
    />

    <GreenButton
      v-show="!canAddNewBillingAddress"
      type="Tertiary"
      color="Grey"
      shape="Round"
      size="Medium"
      :disabled="loadingBilling"
      :loading="loadingBilling"
      @click="canAddNewBillingAddress = true"
    >
      {{ $t("Add new Billing Address") }}
    </GreenButton>

    <div class="flex justify-between my-10">
      <GreenCheckbox
        v-model="copyShippingToBilling"
        :has-general-wrapper="false"
        :label="$t('Copy address data from shipping')"
      />

      <GreenCheckbox
        v-model="generateInvoice"
        :has-general-wrapper="false"
        :label="$t('I want to generate invoice for the company')"
      />
    </div>

    <div class="submit-button mb-10">
      <GreenButton
        type="Tertiary"
        color="Grey"
        shape="Round"
        size="Medium"
        :disabled="!canGoReviewOrder"
        :loading="loading"
        @click="handleGoToReviewOrder"
      >
        {{ $t("GO TO REVIEW ORDER") }}
      </GreenButton>
      <SfButton
        class="
            color-primary
            sf-button
            revieworder_button
            mt-4
            smartphone-only
          "
        @click="$router.push('/checkout/personaldetails')"
      >
        {{ $t("GO BACK") }}
      </SfButton>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ref, defineComponent } from '@nuxtjs/composition-api';
import { SfButton, SfHeading } from '@storefront-ui/vue';
import { useBilling, useCart, useCountrySearch, useShipping, useUser, useUserShipping } from '@vue-storefront/odoo';
import { onSSR } from '@vue-storefront/core';

export default defineComponent({
  name: 'Shipping',
  components: {
    SfHeading,
    SfButton,
    VsfShippingProvider: () => import('~/components/Checkout/VsfShippingProvider.vue')
  },
  emits: ['finish', 'change'],
  setup(_, { emit }) {
    const { cart } = useCart();
    const isFormSubmitted = ref(false);
    const formRef = ref(null);
    const defaultShippingAddress = ref(false);
    const copyShippingToBilling = ref(false);
    const generateInvoice = ref(false);
    const canAddNewAddress = ref(false);
    const canAddNewBillingAddress = ref(false);
    const newCurrentAddressId = ref(null);

    const { shipping: userShipping, load, setDefaultAddress } = useUserShipping();
    const { load: loadShipping, shipping, save, loading } = useShipping();
    const { load: loadBilling, billing, save: saveBilling, loading: loadingBilling } = useBilling();
    const { search, countries } = useCountrySearch('countries');

    const { isAuthenticated } = useUser();

    const currentAddressId = computed(() => shipping.value?.id);

    const selectedShippingMethod = computed(() => cart.value?.order?.shippingMethod || {});

    const hasSavedShippingAddress = computed(() => {
      return Boolean(shipping.value);
    });

    const showAdresses = computed(() => hasSavedShippingAddress.value && !canAddNewAddress.value);

    const handleAddNewBillingAddress = async (form) => {
      await saveBilling({
        params: {
          ...form,
          name: `${form.firstName} ${form.lastName}`,
          countryId: parseInt(form.country.id)
        },
        billingDetails: null
      });
      canAddNewBillingAddress.value = false;
    };

    const handleAddNewAddress = async (form) => {
      await save({
        params: {
          ...form,
          name: `${form.firstName} ${form.lastName}`,
          countryId: parseInt(form.country.id)
        },
        shippingDetails: null,
        customQuery: { shippingAddAdress: 'greenAddAddress'}
      });

      await loadShipping();
      await load();
      canAddNewAddress.value = false;
    };

    const canGoReviewOrder = computed(() => {

      if (canAddNewAddress.value) return false;

      if (!selectedShippingMethod.value) return false;

      return true;
    });

    const handleSetCurrentAddress = (address) => {
      if (defaultShippingAddress.value) {
        newCurrentAddressId.value = address.id;
      }
    };

    const goToOrderReview = () => emit('change', 'revieworder');

    const handleGoToReviewOrder = async () => {
      if (newCurrentAddressId.value) {
        await setDefaultAddress({ address: { id: newCurrentAddressId.value }});
      }

      goToOrderReview();
    };

    onSSR(async () => {
      await search();
      await loadShipping();
      await loadBilling();
      await load();

      if (!hasSavedShippingAddress.value) {
        canAddNewAddress.value = true;
      }
      formRef?.value?.validate({ silent: true });
    });

    return {
      generateInvoice,
      copyShippingToBilling,
      selectedShippingMethod,
      cart,
      handleGoToReviewOrder,
      canGoReviewOrder,
      userShipping,
      showAdresses,
      loading,
      loadingBilling,
      formRef,
      canAddNewAddress,
      canAddNewBillingAddress,
      handleAddNewBillingAddress,
      handleAddNewAddress,
      defaultShippingAddress,
      handleSetCurrentAddress,
      currentAddressId,
      shipping,
      hasSavedShippingAddress,
      isAuthenticated,
      isFormSubmitted,
      countries
    };
  }
});
</script>

<style lang="scss" scoped>
@import '~/assets/css/shipping.scss';
</style>
