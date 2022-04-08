<template>
  <ValidationObserver
    v-slot="{ handleSubmit, invalid }"
    ref="formRef"
  >
    <div
      v-if="invalid"
      class="button-wrap"
    >
      <button
        class="color-primary sf-button login-btn"
        :aria-disabled="false"
        :link="null"
        type="button"
        @click="handleAccountClick"
      >
        LOG INTO YOUR ACCOUNT
      </button>
      <p>or fill the details below:</p>
    </div>
    <SfHeading
      :level="3"
      :title="$t('Personal details')"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <form @submit.prevent="handleSubmit(handleFormSubmit)">
      <UserShippingAddresses
        v-if="isAuthenticated && hasSavedShippingAddress"
        v-model="defaultShippingAddress"
        :current-address-id="currentAddressId || ''"
        @setCurrentAddress="handleSetCurrentAddress"
      />
      <div
        v-if="canAddNewAddress"
        class="form"
      >
        <div class="first-name-last-name">
          <div class="lastname">
            <ValidationProvider
              v-slot="{ errors }"
              name="firstName"
              rules="required|min:2"
              slim
            >
              <SfInput
                v-model="form.fname"
                label="First name"
                name="firstName"
                class="form__element"
                required
                :valid="!errors[0]"
                :error-message="errors[0]"
              />
            </ValidationProvider>
          </div>
          <div class="lastname">
            <ValidationProvider
              v-slot="{ errors }"
              name="lastname"
              rules="required|min:2"
              slim
            >
              <SfInput
                v-model="form.lname"
                label="Last Name"
                name="lastName"
                class="form__element"
                required
                :valid="!errors[0]"
                :error-message="errors[0]"
              />
            </ValidationProvider>
          </div>
        </div>
        <ValidationProvider
          v-slot="{ errors }"
          name="streetName"
          rules="required|min:2"
          slim
        >
          <SfInput
            v-model="form.street"
            label="Your email address"
            name="email"
            class="form__element email-input"
            required
            :valid="!errors[0]"
            :error-message="errors[0]"
          />
        </ValidationProvider>
      </div>
      <SfButton
        v-if="!canAddNewAddress"
        class="color-light form__action-button form__action-button--add-address"
        type="button"
        @click="handleAddNewAddressBtnClick"
      >
        {{ $t("Add new address") }}
      </SfButton>
      <SfButton
        type="submit"
        class="color-light shipping-btn"
        :disabled="invalid"
      >
        {{ $t("SAVE CHANGES") }}
      </SfButton>
    </form>

    <div
      v-if="invalid"
      class="checkbox-wrap"
    >
      <GreenCheckbox :has-general-wrapper="true" />
      <p class="label">
        Join newsletter
      </p>
    </div>

    <div
      v-if="invalid"
      class="perks-wrap"
    >
      <p class="title">
        Enjoy these perks with your free account!
      </p>
      <div class="perks">
        <div class="perk">
          <img :src="require('/assets/images/personaldetails/clock.svg')">
          <p class="label">
            Faster<br>checkout
          </p>
        </div>
        <div class="perk">
          <img :src="require('/assets/images/personaldetails/coins.svg')">
          <p class="label">
            Earn credits with every<br>
            purchase
          </p>
        </div>
        <div class="perk">
          <img :src="require('/assets/images/personaldetails/award.svg')">
          <p class="label">
            Full rewards program<br>
            benefits
          </p>
        </div>
        <div class="perk perk-favourite">
          <img
            :src="require('/assets/images/personaldetails/favourites.svg')"
          >
          <p class="label">
            Manage your wishlist
          </p>
        </div>
      </div>
    </div>
    <div class="checkbox-button-wrap">
      <div
        v-if="invalid"
        class="checkbox-wrap"
      >
        <GreenCheckbox :has-general-wrapper="true" />
        <p class="label">
          I want to create an account.
        </p>
      </div>
      <div class="submit-button">
        <SfButton
          class="color-primary sf-button shipping-btn"
          @click="$router.push('/checkout/shipping')"
        >
          {{ $t("GO TO SHIPPING") }}
        </SfButton>

        <SfButton
          class="color-primary sf-button shipping-btn smartphone-only"
          @click="$router.push('/')"
        >
          {{ $t("BACK TO SHOPPING") }}
        </SfButton>
      </div>
    </div>
  </ValidationObserver>
</template>

<script >
import { SfHeading, SfInput, SfButton } from '@storefront-ui/vue';
import { useUiState } from '~/composables';

import { ref, watch, onMounted, computed } from '@nuxtjs/composition-api';
import {
  useCountrySearch,
  useUser,
  useCart,
  cartGetters,
  userShippingGetters,
  useShipping
} from '@vue-storefront/odoo';
import { required, min, digits } from 'vee-validate/dist/rules';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';

extend('required', { ...required, message: 'This field is required' });
extend('min', {
  ...min,
  message: 'The field should have at least {length} characters'
});
extend('digits', { ...digits, message: 'Please provide a valid phone number' });

export default {
  name: 'Personaldetails',
  components: {
    SfHeading,
    SfInput,
    SfButton,
    ValidationProvider,
    ValidationObserver,
    UserShippingAddresses: () =>
      import('~/components/Checkout/UserShippingAddresses.vue')
    // VsfShippingProvider: () =>
    //   import('~/components/Checkout/VsfShippingProvider')
  },
  emits: ['finish'],
  setup(props, { root, emit }) {
    const { isAuthenticated } = useUser();
    if (isAuthenticated.value) {
      return root.$router.push('/checkout/shipping');
    }
    const { cart } = useCart();
    const totalItems = computed(() => cartGetters.getTotalItems(cart.value));
    if (totalItems.value === 0) root.$router.push('/cart');
    const isFormSubmitted = ref(false);
    const formRef = ref(false);
    const currentAddressId = ref('');
    const defaultShippingAddress = ref(false);
    const isShippingDetailsStepCompleted = ref(false);
    const canAddNewAddress = ref(true);

    const { load: loadShipping, shipping, save } = useShipping();
    const { toggleLoginModal } = useUiState();

    const { search, searchCountryStates, countries, countryStates } =
      useCountrySearch();

    const form = ref({
      fname: '',
      lname: '',
      street: '',
      city: '',
      state: { id: null },
      country: { id: null },
      zip: '',
      phone: null,
      selectedMethodShipping: null
    });

    const handleFormSubmit = async () => {
      await save({ shippingDetails: form.value });
      isFormSubmitted.value = true;

      if (root.$router.history.current.path !== '/my-account/shipping-details')
        root.$router.push('/checkout/billing');
      else root.$router.push('/my-account/shipping-details');

      emit('finish', true);
    };

    const hasSavedShippingAddress = computed(() => {
      if (!isAuthenticated.value || !shipping.value) {
        return false;
      }

      const addresses = userShippingGetters.getAddresses(shipping.value);
      return Boolean(addresses?.length);
    });

    const handleAddNewAddressBtnClick = () => {
      currentAddressId.value = '';
      form.value = {};
      canAddNewAddress.value = true;
      isShippingDetailsStepCompleted.value = false;
    };

    const handleSetCurrentAddress = (addr) => {
      form.value = addr;
      currentAddressId.value = addr?.id;
      canAddNewAddress.value = false;
      isShippingDetailsStepCompleted.value = false;
    };

    const handleSelectedMethodShipping = (method) => {
      form.value.selectedMethodShipping = method;
    };

    const handleAccountClick = () => {
      toggleLoginModal();
    };

    onMounted(async () => {
      await search();
      await loadShipping();

      if (shipping.value) {
        form.value = shipping.value;
      }
      formRef.value.validate({ silent: true });
    });

    watch(
      () => form.value.country.id,
      async () => {
        await searchCountryStates(form.value.country.id);
        if (!countryStates.value || countryStates.value.length === 0) {
          form.value.state.id = null;
        }
      }
    );
    watch(
      () => totalItems.value,
      () => {
        if (totalItems.value === 0) root.$router.push('/cart');
      }
    );

    return {
      cart,
      formRef,
      handleSelectedMethodShipping,
      isShippingDetailsStepCompleted,
      canAddNewAddress,
      handleAddNewAddressBtnClick,
      defaultShippingAddress,
      handleSetCurrentAddress,
      currentAddressId,
      shipping,
      hasSavedShippingAddress,
      isAuthenticated,
      isFormSubmitted,
      form,
      countries,
      countryStates,
      handleFormSubmit,
      handleAccountClick
    };
  }
};
</script>

<style lang="scss" scoped>
@import '~/assets/css/personalDetails.scss';
</style>
