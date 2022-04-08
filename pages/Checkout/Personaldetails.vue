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

    <div class="form">
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

      <CheckoutPerks />
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
import { onMounted, ref } from '@nuxtjs/composition-api';
import { SfButton, SfHeading, SfInput } from '@storefront-ui/vue';
import { onSSR } from '@vue-storefront/core';
import { useCart, useCountrySearch, useShipping } from '@vue-storefront/odoo';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import { useUiState } from '~/composables';

export default {
  name: 'Personaldetails',
  components: {
    SfHeading,
    SfInput,
    SfButton,
    ValidationProvider,
    ValidationObserver
  },
  emits: ['next'],
  setup(props, { root, emit }) {

    const { cart } = useCart();
    const isFormSubmitted = ref(false);
    const formRef = ref(false);
    const defaultShippingAddress = ref(false);

    const { toggleLoginModal } = useUiState();

    const { search, countries } = useCountrySearch();

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

      emit('next', true);
    };

    const handleAccountClick = () => {
      toggleLoginModal();
    };

    onMounted(async () => {
      formRef.value.validate({ silent: true });
    });

    onSSR(async () => {
      await search();
    });

    return {
      cart,
      formRef,
      defaultShippingAddress,
      isFormSubmitted,
      form,
      countries,
      handleFormSubmit,
      handleAccountClick
    };
  }
};
</script>

<style lang="scss" scoped>
@import '~/assets/css/personalDetails.scss';
</style>
