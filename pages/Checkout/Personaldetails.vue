<template>
  <ValidationObserver
    v-slot="{ handleSubmit, invalid }"
    ref="formRef"
  >
    <div
      v-show="invalid"
      class="button-wrap"
    >
      <button
        class="color-primary sf-button login-btn"
        type="button"
        @click="toggleLoginModal"
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

    <form class="form">
      <div class="first-name-last-name">
        <div class="lastname">
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
        </div>
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
        name="email"
        rules="required|email"
        slim
      >
        <SfInput
          v-model="form.email"
          label="Your email address"
          name="email"
          class="form__element email-input"
          required
          :valid="!errors[0]"
          :error-message="errors[0]"
        />
      </ValidationProvider>
    </form>

    <GreenCheckbox
      v-show="invalid"
      v-model="newsLetter"
      :has-general-wrapper="false"
      label="Join newsletter"
    />

    <div
      v-show="invalid"
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

      <ValidationProvider
        v-slot="{ errors }"
        name="password"
        rules="required"
        slim
      >
        <SfInput
          v-model="form.password"
          label="Password"
          name="email"
          class="form__element password"
          required
          :valid="!errors[0]"
          :error-message="errors[0]"
        />
      </ValidationProvider>

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
import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api';
import { SfButton, SfHeading, SfInput } from '@storefront-ui/vue';
import { useCart } from '@vue-storefront/odoo';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import { useUiState } from '~/composables';

export default defineComponent({
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
    const newsLetter = ref(false);

    const { toggleLoginModal } = useUiState();

    const form = ref({
      firstName: '',
      lastName: '',
      password: '',
      email: null
    });

    const handleFormSubmit = async () => {

      emit('next', true);
    };

    onMounted(async () => {
      formRef.value.validate({ silent: true });
    });

    return {
      toggleLoginModal,
      cart,
      form,
      newsLetter,
      formRef,
      isFormSubmitted,
      handleFormSubmit
    };
  }
});
</script>

<style lang="scss" scoped>
@import '~/assets/css/personalDetails.scss';
</style>
