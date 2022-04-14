<template>
  <div>
    <SfHeading
      :level="3"
      :title="$t('Shipping Details')"
      class="sf-heading--left sf-heading--no-underline title"
    />

    <CheckoutUserShippingAddresses
      v-show=" showShippingAddresses "
      v-model="defaultShippingAddress"
      :current-address-id="currentAddressId || ''"
      :addresses="userShipping"
      @set-current-address="handleSetCurrentShippingAddress"
    />

    <GreenButton
      v-show="!canAddNewAddress"
      type="Tertiary"
      color="Grey"
      shape="Round"
      size="Medium"
      :disabled="loadingShipping"
      :loading="loadingShipping"
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
      :loading="loadingShipping"
      :countries="countries"
      class="mb-5"
      @submit="addNewAddres"
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

    <CheckoutUserShippingAddresses
      v-show="showBillingAdresses"
      v-model="defaultBillingAddress"
      :current-address-id="currentBillingAddressId || ''"
      :addresses="userBilling"
      @set-current-address="handleSetCurrentBillingAddress"
    />

    <CheckoutAddressForm
      v-if="canAddNewBillingAddress"
      :loading="loadingBilling"
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

    <div class="flex justify-between my-10 px-4">
      <GreenCheckbox
        v-model="copyShippingToBilling"
        :value="copyShippingToBilling"
        :is-checked="copyShippingToBilling"
        :has-general-wrapper="false"
        :label="$t('Copy address data from shipping')"
      />

      <!-- <GreenCheckbox
        v-model="generateInvoice"
        :value="generateInvoice"
        :has-general-wrapper="false"
        :label="$t('I want to generate invoice for the company')"
      /> -->
    </div>

    <div class="submit-button mb-10">
      <GreenButton
        type="Tertiary"
        color="Grey"
        shape="Round"
        size="Medium"
        :disabled="!canGoReviewOrder"
        @click="handleGoToReviewOrder"
      >
        {{ $t("GO TO REVIEW ORDER") }}
      </GreenButton>
      <SfButton
        class="color-primary sf-button revieworder_button mt-4 smartphone-only"
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
import { useCart, useCountrySearch, useUser } from '@vue-storefront/odoo';
import { onSSR } from '@vue-storefront/core';
import { useCheckoutShipping, useCheckoutBilling } from '~/composables';

export default defineComponent({
  name: 'Shipping',
  components: {
    SfHeading,
    SfButton,
    VsfShippingProvider: () =>
      import('~/components/Checkout/VsfShippingProvider.vue')
  },
  emits: ['finish', 'change'],
  setup(_, { emit }) {
    const { cart } = useCart();
    const { search, countries } = useCountrySearch('countries');
    const { isAuthenticated } = useUser();

    const isFormSubmitted = ref(false);
    const formRef = ref(null);
    const copyShippingToBilling = ref(true);
    const generateInvoice = ref(false);

    const {
      defaultShippingAddress,
      canAddNewAddress,
      hasSavedShippingAddress,
      showShippingAddresses,
      handleAddNewAddress,
      currentAddressId,
      setDefaultShippingAddress,
      loadShipping,
      loadUserShipping,
      loadingShipping,
      userShipping,
      handleSetCurrentShippingAddress,
      newCurrentShippingAddressId
    } = useCheckoutShipping();

    const {
      defaultBillingAddress,
      canAddNewBillingAddress,
      hasSavedBillingAddress,
      showBillingAdresses,
      handleAddNewBillingAddress,
      currentBillingAddressId,
      setDefaultBillingAddress,
      newCurrentBillingAddressId,
      loadBilling,
      loadUserBilling,
      loadingBilling,
      userBilling,
      handleSetCurrentBillingAddress
    } = useCheckoutBilling();

    const addNewAddres = async (form) => {
      await handleAddNewAddress(form);
      if (copyShippingToBilling.value) {
        handleAddNewBillingAddress(form);
      }
    };

    const selectedShippingMethod = computed(
      () => cart.value?.order?.shippingMethod || {}
    );

    const canGoReviewOrder = computed(() => {
      if (canAddNewAddress.value) return false;

      if (!selectedShippingMethod.value) return false;

      if (cart.value?.order?.partnerShipping?.name.includes('Public')) return false;

      if (cart.value?.order?.partnerInvoice?.name.includes('Public')) return false;

      return true;
    });

    const goToOrderReview = () => emit('change', 'revieworder');

    const handleGoToReviewOrder = async () => {
      if (newCurrentShippingAddressId.value && defaultShippingAddress.value) {
        await setDefaultShippingAddress({ address: { id: newCurrentShippingAddressId.value } });
      }
      if (newCurrentBillingAddressId.value && defaultBillingAddress.value) {
        await setDefaultBillingAddress({ address: { id: newCurrentBillingAddressId.value } });
      }

      goToOrderReview();
    };

    onSSR(async () => {
      await search();
      await loadShipping();
      await loadBilling();
      await loadUserShipping();
      await loadUserBilling();

      if (!hasSavedShippingAddress.value) {
        canAddNewAddress.value = true;
      }
      if (!hasSavedBillingAddress.value) {
        canAddNewBillingAddress.value = true;
      }

      formRef?.value?.validate({ silent: true });
    });

    return {
      hasSavedBillingAddress,
      currentBillingAddressId,
      handleSetCurrentBillingAddress,
      defaultBillingAddress,
      userBilling,
      generateInvoice,
      showBillingAdresses,
      copyShippingToBilling,
      selectedShippingMethod,
      cart,
      handleGoToReviewOrder,
      canGoReviewOrder,
      userShipping,
      showShippingAddresses,
      loadingShipping,
      loadingBilling,
      formRef,
      canAddNewAddress,
      canAddNewBillingAddress,
      handleAddNewBillingAddress,
      addNewAddres,
      defaultShippingAddress,
      handleSetCurrentShippingAddress,
      currentAddressId,
      hasSavedShippingAddress,
      isAuthenticated,
      isFormSubmitted,
      countries
    };
  }
});
</script>

<style lang="scss" scoped>
@import "~/assets/css/shipping.scss";
</style>
