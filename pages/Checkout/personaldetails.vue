<template>
  <ValidationObserver
    v-slot="{ handleSubmit, invalid }"
    ref="formRef"
  >
    <div class="button-wrap">
      <button
        class="color-primary sf-button login-btn"
        :aria-disabled="false"
        :link="null"
        type="button"
      >
        LOG INTO YOUR ACCOUNT
      </button>
      <p>or fill the details below:</p>
    </div>
    <SfHeading
      :level="3"
      :title="$t('Shipping Details')"
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
          <ValidationProvider
            v-slot="{ errors }"
            name="firstName"
            rules="required|min:2"
            slim
          >
            <SfInput
              v-model="form.name"
              label="First name"
              name="firstName"
              class="form__element"
              required
              :valid="!errors[0]"
              :error-message="errors[0]"
            />
          </ValidationProvider>
          <div class="lastname">
            <ValidationProvider
              v-slot="{ errors }"
              name="lastname"
              rules="required|min:2"
              slim
            >
              <SfInput
                v-model="form.name"
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
        @click.native="handleAddNewAddressBtnClick"
      >
        {{ $t("Add new address") }}
      </SfButton>

      <SfButton
        type="submit"
        :disabled="invalid"
      >
        {{ $t("Continue to billing") }}
      </SfButton>
    </form>

    <div class="checkbox-wrap">
      <GreenCheckbox :has-general-wrapper="false" />
      <p class="label">
        Join newsletter
      </p>
    </div>

    <div class="perks-wrap">
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
      </div>
    </div>
    <div class="checkbox-button-wrap">
      <div class="checkbox-wrap">
        <GreenCheckbox :has-general-wrapper="false" />
        <p class="label">
          I want to create an account.
        </p>
      </div>
      <nuxt-link to="/">
        <SfButton class="color-primary sf-button shipping-btn">
          {{ $t("Go back") }}
        </SfButton>
      </nuxt-link>
      <nuxt-link to="/checkout/shipping">
        <SfButton class="color-primary sf-button shipping-btn">
          {{ $t("GO TO SHIPPING") }}
        </SfButton>
      </nuxt-link>
    </div>
  </ValidationObserver>
</template>

<script>
import { SfHeading, SfInput, SfButton } from '@storefront-ui/vue';
import { ref, watch, onMounted, computed } from '@nuxtjs/composition-api';
import {
  useCountrySearch,
  useUser,
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
  name: 'Shipping',
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
    const isFormSubmitted = ref(false);
    const formRef = ref(false);
    const currentAddressId = ref('');
    const defaultShippingAddress = ref(false);
    const isShippingDetailsStepCompleted = ref(false);
    const canAddNewAddress = ref(true);

    const { load: loadShipping, shipping, save } = useShipping();

    const { isAuthenticated } = useUser();

    const { search, searchCountryStates, countries, countryStates } =
      useCountrySearch();

    const form = ref({
      name: '',
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

    return {
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
      handleFormSubmit
    };
  }
};
</script>

<style lang="scss" scoped>
.form {
  --button-width: 100%;
  &__select {
    display: flex;
    align-items: center;
    --select-option-font-size: var(--font-size--lg);
    ::v-deep .sf-select__dropdown {
      font-size: var(--font-size--lg);
      margin: 0;
      color: var(--c-text);
      font-family: var(--font-family--secondary);
      font-weight: var(--font-weight--normal);
    }
    ::v-deep .sf-select__label {
      left: initial;
    }
  }
  @include for-desktop {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    --button-width: auto;
  }
  &__element {
    margin: 0 0 var(--spacer-xl) 0;
    @include for-desktop {
      flex: 0 0 100%;
    }
    &--half {
      @include for-desktop {
        flex: 1 1 50%;
      }
      &-even {
        @include for-desktop {
          padding: 0 0 0 var(--spacer-xl);
        }
      }
    }
  }
  &__action {
    @include for-desktop {
      flex: 0 0 100%;
      display: flex;
    }
  }
  &__action-button {
    &--secondary {
      @include for-desktop {
        order: -1;
        text-align: left;
      }
    }
    &--add-address {
      width: 100%;
      margin: 0;
      @include for-desktop {
        margin: 0 0 var(--spacer-lg) 0;
        width: auto;
      }
    }
  }
  &__back-button {
    margin: var(--spacer-xl) 0 var(--spacer-sm);
    &:hover {
      color: var(--c-white);
    }
    @include for-desktop {
      margin: 0 var(--spacer-xl) 0 0;
    }
  }
}
.shipping {
  &__label {
    display: flex;
    justify-content: space-between;
  }
  &__description {
    --radio-description-margin: 0;
    --radio-description-font-size: var(--font-xs);
  }
}
.title {
  margin: var(--spacer-xl) 0 var(--spacer-base) 0;
}

::v-deep .first-name-last-name {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

::v-deep .first-name-last-name .form__element {
  flex: 1 1 50%;
}

::v-deep .first-name-last-name .lastname {
  flex: 1 1 50%;
  padding-left: 20px;
}

::v-deep .sf-input__label {
  font-size: 18px;
  font-weight: 300;
  color: #43464e;
  font-family: "Josefin Sans";
  padding-left: 5px;
}

::v-deep .sf-heading__title {
  font-size: 34px;
  font-weight: 700;
  color: #1d1f22;
}

::v-deep .form__element--half-even {
  padding-left: 20px;
}

::v-deep .sf-button.is-disabled--button {
  display: none;
}

::v-deep .login-btn {
  font-size: 14px;
  background: #32463d;
  color: #fff;
  font-weight: 500;
  border-radius: 100px;
  font-family: "Josefin Sans";
  max-width: 296px;
  width: 100%;
  padding-top: 20px;
  margin-top: 40px;
  margin-bottom: 40px;
}

::v-deep .shipping-btn {
  font-size: 14px;
  background: #32463d;
  color: #fff;
  font-weight: 500;
  border-radius: 100px;
  font-family: "Josefin Sans";
  max-width: 223px;
  width: 100%;
  padding-top: 20px;
  margin-top: 42px;
}

::v-deep .button-wrap p {
  color: #43464e;
  font-size: 20px;
  font-weight: 500;
}

::v-deep .email-input {
  margin-bottom: 0;
}

::v-deep .checkbox-wrap {
  display: flex;
  align-items: center;
}

::v-deep .checkbox-wrap p {
  padding-left: 8px;
}

::v-deep .perks-wrap .perk {
  display: flex;
  align-items: center;
}

::v-deep .perks {
  max-width: 578px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 68px;
}

::v-deep .perk .label {
  font-size: 18px;
  color: #72757e;
  font-weight: 400;
  padding-left: 8px;
}

::v-deep .checkbox-button-wrap {
  margin-bottom: 86px;
}
</style>
