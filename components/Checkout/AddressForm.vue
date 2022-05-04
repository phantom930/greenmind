<template>
  <ValidationObserver
    v-slot="{ handleSubmit, invalid }"
    ref="formRef"
    tag="div"
  >
    <form @submit.prevent="handleSubmit(submitForm)">
      <div class="form">
        <div class="first-name-last-name">
          <ValidationProvider
            v-slot="{ errors }"
            name="firstName"
            rules="required"
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
              rules="required"
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
          rules="required"
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
          rules="required"
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
          rules="required"
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
          rules="required"
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
        v-if="false"
        style-type="Primary"
        color="Grey"
        shape="Round"
        size="Medium"
        :disabled="invalid || loading"
        :loading="loading"
        @submit="submitForm"
      >
        {{ $t("Save Address") }}
      </GreenButton>
    </form>
  </ValidationObserver>
</template>
<script lang="ts">
import { defineComponent, reactive, PropType, onMounted, watch, ref } from '@nuxtjs/composition-api';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import { SfInput, SfSelect } from '@storefront-ui/vue';
import { Address, Country } from '@vue-storefront/odoo-api';

const formInitialState = () =>({
  firstName: '',
  lastName: '',
  street: '',
  city: '',
  state: { id: null },
  country: { id: null },
  zip: '',
  phone: null,
  selectedMethodShipping: null,
  id: null
});

export default defineComponent({
  components: {
    ValidationObserver,
    ValidationProvider,
    SfInput,
    SfSelect
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    countries: {
      type: Array as PropType<Country[]>,
      required: true
    },
    currentAddressData: {
      type: Object as PropType<Address>,
      default: null
    }
  },
  emits: ['submit'],
  setup(props, { emit, refs }) {
    const form = reactive(formInitialState());
    const formRef = ref(null);

    const submitForm = () => {
      emit('submit', form);
    };

    const resetForm = () => {
      Object.assign(form, formInitialState());
    };

    const loadData = () => {
      const splitedName = props.currentAddressData?.name?.split(' ');

      form.lastName = splitedName?.pop() || '';
      form.firstName = splitedName?.join(' ') || '';
      form.city = props.currentAddressData?.city;
      form.id = props.currentAddressData?.id;
      form.street = props.currentAddressData?.street;
      form.phone = props.currentAddressData?.phone;
      form.zip = props.currentAddressData?.zip;
      form.country.id = String(props.currentAddressData?.country.id);
    };

    watch(
      () => props.currentAddressData,
      () => loadData(),
      { deep: true }
    );

    onMounted(()=> {
      loadData();
    });

    return {
      submitForm,
      resetForm,
      form,
      formRef
    };
  }
});
</script>
<style lang="scss" scoped>
@import '~/assets/css/addressForm.scss';
</style>
