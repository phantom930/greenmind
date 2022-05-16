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
              :label="$t('First name')"
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
                :label="$t('Last Name')"
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
            :label="$t('Street name')"
            name="streetName"
            class="form__element"
            required
            :valid="!errors[0]"
            :error-message="errors[0]"
          />
        </ValidationProvider>

        <ValidationProvider
          v-slot="{ errors }"
          name="streetTwoName"
          rules="required"
          slim
        >
          <SfInput
            v-model="form.street2"
            :label="`${$t('Street name')} 2` "
            name="streetTwoName"
            class="form__element"
            required
            :valid="!errors[0]"
            :error-message="errors[0]"
          />
        </ValidationProvider>

        <ValidationProvider
          v-slot="{ errors }"
          name="between 3-4"
          rules="required|min:3|max:4"
          slim
        >
          <SfInput
            v-model="form.zip"
            :label="$t('Zip Code')"
            name="zipCode"
            type="number"
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
            :label="$t('City')"
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
            :label="$t('Country')"
            name="country"
            class="
              form__element form__element--half form__select
              sf-select--underlined
            "
            required
            value=""
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
          name="8"
          rules="required|digits:8"
          slim
        >
          <SfInput
            v-model="form.phone"
            :label="$t('Phone number')"
            type="number"
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
import { defineComponent, reactive, PropType, watch, ref, onMounted } from '@nuxtjs/composition-api';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import { SfInput, SfSelect } from '@storefront-ui/vue';
import { Address, Country } from '@vue-storefront/odoo-api';

const formInitialState = () =>({
  firstName: '',
  lastName: '',
  street: '',
  street2: '',
  city: '',
  state: { id: null },
  country: { id: '59' },
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
      form.street2 = props.currentAddressData?.street2;
      form.phone = props.currentAddressData?.phone;
      form.zip = props.currentAddressData?.zip;

      if (props.currentAddressData?.country) {
        form.country.id = String(props.currentAddressData?.country?.id || '0');
      }

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
