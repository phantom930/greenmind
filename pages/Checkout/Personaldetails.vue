<template>
  <div>
    <ValidationObserver
      v-slot="{ handleSubmit, invalid }"
      ref="formRef"
    >
      <div v-show="invalid" class="button-wrap">
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

      <form class="form" @submit="handleSubmit(handleFormSubmit)">
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

      <p v-show="invalid" class="title">
        Enjoy these perks with your free account!
      </p>

      <CheckoutPerks />

      <div class="flex flex-wrap mb-5 items-baseline" style="height: 69px;">
        <GreenCheckbox
          v-show="invalid"
          v-model="wantRegister"
          class="pt-3"
          :has-general-wrapper="false"
          :label="$t('I want to create an account')"
        />

        <ValidationProvider
          v-show="wantRegister"
          v-slot="{ errors }"
          name="password"
          :rules="wantRegister ? 'required' : ''"
          slim
          style="max-width: 50%"
        >
          <SfInput
            v-model="form.password"
            label="Password"
            name="password"
            type="password"
            class="form__element password"
            required
            style="margin: 0"
            :valid="!errors[0]"
            :error-message="errors[0]"
          />
        </ValidationProvider>
      </div>
      <div class="submit-button mb-5">
        <GreenButton
          type="Primary"
          color="Green"
          shape="Round"
          size="Medium"
          class="mb-3 desktop-only"
          :disabled="invalid || loading"
          :loading="loading"
          @click="handleSubmit(handleFormSubmit)"
        >
          {{ $t("GO TO SHIPPING") }}
        </GreenButton>

        <SfButton
          class="color-primary sf-button shipping-btn smartphone-only"
          @click="$router.push('/')"
        >
          {{ $t("BACK TO SHOPPING") }}
        </SfButton>
      </div>
    </ValidationObserver>

    <LoginModal @success="goToShipping" />
  </div>
</template>

<script >
import { defineComponent, onMounted, ref, reactive } from '@nuxtjs/composition-api';
import { SfButton, SfHeading, SfInput } from '@storefront-ui/vue';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import { useCart, useUser } from '@vue-storefront/odoo';
import { useUiState, useUiNotification } from '~/composables';
import LoginModal from '~/components/LoginModal.vue';

export default defineComponent({
  name: 'Personaldetails',
  components: {
    SfHeading,
    SfInput,
    SfButton,
    ValidationProvider,
    ValidationObserver,
    LoginModal
  },
  emits: ['change'],
  setup(props, { root, emit }) {

    const { cart } = useCart();
    const { register, loading, error } = useUser();
    const { toggleLoginModal } = useUiState();
    const { send } = useUiNotification();

    const isFormSubmitted = ref(false);
    const formRef = ref(false);
    const newsLetter = ref(false);
    const wantRegister = ref(false);

    const form = reactive({
      firstName: '',
      lastName: '',
      password: '',
      email: null
    });

    const goToShipping = () => emit('change', 'shipping');

    const handleFormSubmit = async () => {
      if (wantRegister.value) {
        await register({ user: { ...form, name: `${form.firstName} ${form.lastName}`} });
      } else {
        //
      }

      if (error.value.register) {
        send({ message: error?.value?.register?.message, type: 'danger' });
        return;
      }

      goToShipping();
    };

    onMounted(async () => {
      formRef.value.validate({ silent: true });
    });

    return {
      toggleLoginModal,
      handleFormSubmit,
      loading,
      cart,
      form,
      newsLetter,
      wantRegister,
      formRef,
      isFormSubmitted,
      goToShipping
    };
  }
});
</script>

<style lang="scss" scoped>
@import '~/assets/css/personalDetails.scss';
</style>
