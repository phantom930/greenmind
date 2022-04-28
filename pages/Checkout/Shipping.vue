<template>
  <div>
    <SfHeading
      :level="3"
      :title="$t('Shipping Details')"
      class="sf-heading--left sf-heading--no-underline title"
    />

    <!-- <CheckoutUserShippingAddresses
      v-show="showShippingAddresses"
      key="shipping"
      :current-address-id="currentAddressId || ''"
      :addresses="userShipping"
      @set-current-address="handleSetCurrentShippingAddress"
    /> -->

    <GreenButton
      v-show="!canAddNewAddress && !hasSavedShippingAddress"
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
      ref="shippingForm"
      :loading="loadingShipping"
      :countries="countries"
      :current-address-data="userShipping[0]"
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

    <!-- <CheckoutUserShippingAddresses
      v-show="showBillingAddresses"
      key="billing"
      :current-address-id="currentBillingAddressId || ''"
      :addresses="userBilling"
      @set-current-address="handleSetCurrentBillingAddress"
    /> -->

    <CheckoutAddressForm
      v-if="!copyShippingToBilling"
      ref="billingForm"
      :loading="loadingBilling"
      :countries="countries"
      :current-address-data="userBilling[0]"
      class="mb-5"
      @submit="handleAddNewBillingAddress"
    />

    <GreenButton
      v-show="!canAddNewBillingAddress && !hasSavedBillingAddress"
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
        :disabled="!canGoReviewOrder || loadingBilling || loadingShipping"
        :loading="loadingBilling || loadingShipping"
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
  setup(_, { emit, refs }) {
    const { cart, load: loadCart, setCart } = useCart();
    const { search, countries } = useCountrySearch('countries');
    const { isAuthenticated } = useUser();

    const isFormSubmitted = ref(false);
    const shippingForm = ref(null);
    const billingForm = ref(null);
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
      shipping,
      loadUserShipping,
      loadingShipping,
      userShipping,
      handleSetCurrentShippingAddress,
      newCurrentShippingAddressId
    } = useCheckoutShipping();

    const hasSavedShippingAddressDifferentPartnerData = computed(() =>
      hasSavedShippingAddress.value && shipping.value.id !== cart.value.order?.partner?.id);

    const {
      defaultBillingAddress,
      canAddNewBillingAddress,
      hasSavedBillingAddress,
      showBillingAddresses,
      handleAddNewBillingAddress,
      currentBillingAddressId,
      setDefaultBillingAddress,
      newCurrentBillingAddressId,
      loadBilling,
      loadUserBilling,
      loadingBilling,
      userBilling,
      billing,
      handleSetCurrentBillingAddress
    } = useCheckoutBilling();

    const hasSavedBillingAddressDifferentPartnerData = computed(() =>
      hasSavedBillingAddress.value && billing.value.id !== cart.value.order?.partner?.id);

    const shippingFormValid = computed(() => shippingForm.value?.formRef.flags.valid);
    const billingFormValid = computed(() => billingForm.value?.formRef.flags.valid);

    const selectedShippingMethod = computed(
      () => cart.value?.order?.shippingMethod || {}
    );

    const canGoReviewOrder = computed(() => {
      // if (canAddNewAddress.value) return false;

      if (!selectedShippingMethod.value?.id) return false;

      if (!hasSavedShippingAddress.value) return false;

      if (!hasSavedBillingAddress.value) return false;

      if (!shippingFormValid.value) return false;

      if (!copyShippingToBilling.value && !billingFormValid.value) return false;

      return true;
    });

    const goToOrderReview = async () => {
      await handleAddNewAddress(shippingForm.value.form);
      await handleAddNewBillingAddress(copyShippingToBilling.value ? shippingForm.value.form : billingForm.value.form);

      emit('change', 'revieworder');
    };

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
      await loadBilling();
      await loadShipping();
      await loadUserShipping();
      await loadUserBilling();

      if (!hasSavedShippingAddressDifferentPartnerData.value) {
        canAddNewAddress.value = true;
      }
      if (!hasSavedBillingAddressDifferentPartnerData.value) {
        canAddNewBillingAddress.value = true;
      }

      formRef?.value?.validate({ silent: true });
    });

    return {
      shippingFormValid,
      hasSavedBillingAddress,
      currentBillingAddressId,
      handleSetCurrentBillingAddress,
      defaultBillingAddress,
      userBilling,
      generateInvoice,
      showBillingAddresses,
      copyShippingToBilling,
      selectedShippingMethod,
      cart,
      billing,
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
      handleAddNewAddress,
      defaultShippingAddress,
      handleSetCurrentShippingAddress,
      currentAddressId,
      hasSavedShippingAddress,
      isAuthenticated,
      isFormSubmitted,
      countries,
      shippingForm,
      billingForm
    };
  }
});
</script>

<style lang="scss" scoped>
@import "~/assets/css/shipping.scss";
</style>
