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
    />
    <ShippingTab />
    <div class="submit-button mb-5">
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
import { useCountrySearch, useShipping, useUser, useUserShipping } from '@vue-storefront/odoo';
import { onSSR } from '@vue-storefront/core';

export default defineComponent({
  name: 'Shipping',
  components: {
    SfHeading,
    SfButton,
    VsfShippingProvider: () => import('~/components/Checkout/VsfShippingProvider.vue')
  },
  emits: ['finish', 'change'],
  setup() {
    const isFormSubmitted = ref(false);
    const formRef = ref(null);
    const defaultShippingAddress = ref(false);
    const canAddNewAddress = ref(false);
    const shippingMethodId = ref(null);
    const newCurrentAddressId = ref(null);

    const { shipping: userShipping, load } = useUserShipping();
    const { load: loadShipping, shipping, save, loading } = useShipping();
    const { search, countries } = useCountrySearch('countries');

    const { isAuthenticated } = useUser();

    const currentAddressId = computed(() => shipping.value?.id);

    const hasSavedShippingAddress = computed(() => {
      return Boolean(shipping.value);
    });

    const showAdresses = computed(() => hasSavedShippingAddress.value && !canAddNewAddress.value);

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

      if (!shippingMethodId.value) return false;

      return true;
    });

    const handleSetCurrentAddress = (address) => {
      if (defaultShippingAddress.value) {
        newCurrentAddressId.value = address.id;
      }
    };

    const handleGoToReviewOrder = () => {
      if (newCurrentAddressId.value) {
        // save novo address
      }
    };

    onSSR(async () => {
      await search();
      await loadShipping();
      await load();

      if (!hasSavedShippingAddress.value) {
        canAddNewAddress.value = true;
      }
      formRef?.value?.validate({ silent: true });
    });

    return {
      shippingMethodId,
      canGoReviewOrder,
      userShipping,
      showAdresses,
      loading,
      formRef,
      canAddNewAddress,
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
