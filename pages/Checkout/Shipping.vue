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

    <ValidationObserver
      v-if="canAddNewAddress"
      v-slot="{ handleSubmit, invalid }"
      ref="formRef"
    >
      <form @submit.prevent="handleSubmit(handleAddNewAddress)">
        <div class="form">
          <div class="first-name-last-name">
            <ValidationProvider
              v-slot="{ errors }"
              name="firstName"
              rules="required|min:2"
              slim
            >
              <SfInput
                v-model="form.firstName"
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
                  v-model="form.lastName"
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
              label="Street name"
              name="streetName"
              class="form__element"
              required
              :valid="!errors[0]"
              :error-message="errors[0]"
            />
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            name="zipCode"
            rules="required|min:2"
            slim
          >
            <SfInput
              v-model="form.zip"
              label="Zip-code"
              name="zipCode"
              class="form__element form__element--half form__element--half"
              required
              :valid="!errors[0]"
              :error-message="errors[0]"
            />
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            name="city"
            rules="required|min:2"
            slim
          >
            <SfInput
              v-model="form.city"
              label="City"
              name="city"
              class="form__element form__element--half-even form__element--half"
              required
              :valid="!errors[0]"
              :error-message="errors[0]"
            />
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            name="country"
            rules="required"
            slim
          >
            <SfSelect
              v-model="form.country.id"
              label="Country"
              name="country"
              class="
              form__element form__element--half form__select
              sf-select--underlined
            "
              required
              :valid="!errors[0]"
              :error-message="errors[0]"
            >
              <SfSelectOption
                v-for="countryOption in countries"
                :key="countryOption.id"
                name=""
                country
                :value="String(countryOption.id)"
              >
                {{ countryOption.name }}
              </SfSelectOption>
            </SfSelect>
          </ValidationProvider>

          <ValidationProvider
            v-slot="{ errors }"
            name="phone"
            rules="required|digits:9"
            slim
          >
            <SfInput
              v-model="form.phone"
              label="Phone number"
              name="phone"
              class="form__element form__element--half-even form__element--half"
              required
              :valid="!errors[0]"
              :error-message="errors[0]"
            />
          </ValidationProvider>
        </div>
        <GreenButton
          type="Primary"
          color="Grey"
          shape="Round"
          size="Medium"
          :disabled="invalid || loading"
          :loading="loading"
          @submit="handleAddNewAddress"
        >
          {{ $t("Save new Address") }}
        </GreenButton>
      </form>
    </ValidationObserver>

    <SfHeading
      :level="3"
      :title="$t('Select shipping method')"
      class="sf-heading--left sf-heading--no-underline title"
    />

    <VsfShippingProvider
      name="selectedMethodShipping"
      :selected-method-shipping="form.selectedMethodShipping"
      @submit="$router.push('/checkout/revieworder')"
      @selected-method="handleSelectedMethodShipping"
    />
    <ShippingTab />
    <div class="submit-button">
      <SfButton
        :disabled="!form.selectedMethodShipping"
        type="submit"
        class="color-primary sf-button revieworder_button"
      >
        {{ $t("GO TO REVIEW ORDER") }}
      </SfButton>
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
import { computed, ref, reactive, defineComponent } from '@nuxtjs/composition-api';
import { SfButton, SfHeading, SfInput, SfSelect } from '@storefront-ui/vue';
import { useCountrySearch, useShipping, useUser, useUserShipping } from '@vue-storefront/odoo';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import { onSSR } from '@vue-storefront/core';

const formInitialState = () =>({
  firstName: '',
  lastName: '',
  street: '',
  city: '',
  state: { id: null },
  country: { id: null },
  zip: '',
  phone: null,
  selectedMethodShipping: null
});

export default defineComponent({
  name: 'Shipping',
  components: {
    SfHeading,
    SfInput,
    SfButton,
    SfSelect,
    ValidationProvider,
    ValidationObserver,
    VsfShippingProvider: () => import('~/components/Checkout/VsfShippingProvider.vue')
  },
  emits: ['finish', 'change'],
  setup(props, { emit }) {
    const isFormSubmitted = ref(false);
    const formRef = ref(null);
    const defaultShippingAddress = ref(false);
    const isShippingDetailsStepCompleted = ref(false);
    const canAddNewAddress = ref(false);

    const { shipping: userShipping, load } = useUserShipping();
    const { load: loadShipping, shipping, save, loading } = useShipping();
    const { isAuthenticated } = useUser();
    const { search, countries } = useCountrySearch();

    const form = reactive(formInitialState());

    const currentAddressId = computed(() => shipping.value?.id);

    const hasSavedShippingAddress = computed(() => {
      return Boolean(shipping.value);
    });

    const showAdresses = computed(() => hasSavedShippingAddress.value && !canAddNewAddress.value);

    const handleAddNewAddress = async () => {
      await save({
        params: {
          ...form,
          name: `${form.firstName} ${form.lastName}`,
          countryId: parseInt(form.country.id)
        },
        customQuery: { shippingAddAdress: 'greenAddAddress'}
      });

      await loadShipping();
      await load();
      canAddNewAddress.value = false;
      Object.assign(form, formInitialState());
    };

    const handleSetCurrentAddress = (addr) => {
      canAddNewAddress.value = false;
      isShippingDetailsStepCompleted.value = false;
    };

    const handleSelectedMethodShipping = (method) => {
      form.selectedMethodShipping = method;
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
      userShipping,
      showAdresses,
      loading,
      formRef,
      handleSelectedMethodShipping,
      isShippingDetailsStepCompleted,
      canAddNewAddress,
      handleAddNewAddress,
      defaultShippingAddress,
      handleSetCurrentAddress,
      currentAddressId,
      shipping,
      hasSavedShippingAddress,
      isAuthenticated,
      isFormSubmitted,
      form,
      countries
    };
  }
});
</script>

<style lang="scss" scoped>
@import '~/assets/css/shipping.scss';
</style>
