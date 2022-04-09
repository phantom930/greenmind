<template>
  <ValidationObserver
    v-slot="{ handleSubmit, invalid }"
    ref="formRef"
  >
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
      <div v-if="canAddNewAddress" class="form">
        <div class="first-name-last-name">
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
            class="form__element form__element--half"
            required
            :valid="!errors[0]"
            :error-message="errors[0]"
          />
        </ValidationProvider>
      </div>
      <SfButton
        class="color-light form__action-button form__action-button--add-address"
        type="button"
        @click="handleAddNewAddressBtnClick"
      >
        {{ $t("Add new address") }}
      </SfButton>

      <SfHeading
        :level="3"
        :title="$t('Select shipping method')"
        class="sf-heading--left sf-heading--no-underline title"
      />
      <VsfShippingProvider
        name="selectedMethodShipping"
        :selected-method-shipping="form.selectedMethodShipping"
        @submit="$router.push('/checkout/revieworder')"
        @selectedMethod="handleSelectedMethodShipping"
      />
      <ShippingTab />
      <div class="submit-button">
        <SfButton
          :disabled="!form.selectedMethodShipping || invalid"
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
    </form>
  </ValidationObserver>
</template>

<script lang="ts">
import { computed, onMounted, ref, reactive, watch, defineComponent, ComputedRef } from '@nuxtjs/composition-api';
import { SfButton, SfHeading, SfInput, SfSelect } from '@storefront-ui/vue';
import { useCountrySearch, userShippingGetters, useShipping, useUser } from '@vue-storefront/odoo';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import { useField } from 'vee-validate';

export default defineComponent({
  name: 'Shipping',
  components: {
    SfHeading,
    SfInput,
    SfButton,
    SfSelect,
    ValidationProvider,
    ValidationObserver,
    UserShippingAddresses: () => import('~/components/Checkout/UserShippingAddresses.vue'),
    VsfShippingProvider: () => import('~/components/Checkout/VsfShippingProvider.vue')
  },
  emits: ['finish', 'change'],
  setup(props, { root, emit }) {
    const isFormSubmitted = ref(false);
    const formRef = ref<useField>(null);
    const currentAddressId = ref('');
    const defaultShippingAddress = ref(false);
    const isShippingDetailsStepCompleted = ref(false);
    const canAddNewAddress = ref(true);

    const { load: loadShipping, shipping, save } = useShipping();
    const { isAuthenticated } = useUser();
    const { search, searchCountryStates, countries, countryStates } = useCountrySearch();

    const form = reactive({
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

    const handleFormSubmit = async () => {
      await save({
        params: {
          ...form,
          stateId: parseInt(form.state.id),
          countryId: parseInt(form.country.id)
        } });
      isFormSubmitted.value = true;

      emit('change', 'billing');
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
      canAddNewAddress.value = true;
      isShippingDetailsStepCompleted.value = false;
    };

    const handleSetCurrentAddress = (addr) => {
      currentAddressId.value = addr?.id;
      canAddNewAddress.value = false;
      isShippingDetailsStepCompleted.value = false;
    };

    const handleSelectedMethodShipping = (method) => {
      form.selectedMethodShipping = method;
    };

    onMounted(async () => {
      await search();
      await loadShipping();

      formRef.value.validate({ silent: true });
    });

    watch(
      () => form.country.id,
      async () => {
        await searchCountryStates(form.country.id);
        if (!countryStates.value || countryStates.value.length === 0) {
          form.state.id = 0;
        } else {
          form.state.id = countryStates.value[0].id;
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
});
</script>

<style lang="scss" scoped>
@import '~/assets/css/shipping.scss';
</style>
