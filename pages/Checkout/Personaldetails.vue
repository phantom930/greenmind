<template>
  <div>
    <ValidationObserver
      v-slot="{ handleSubmit, invalid }"
      ref="formRef"
    >
      <!-- <div v-show="invalid" class="button-wrap">
        <button
          class="color-primary sf-button login-btn"
          type="button"
          @click="toggleLoginModal"
        >
          LOG INTO YOUR ACCOUNT
        </button>

        <p>or fill the details below:</p>
      </div> -->
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
                :label="$t('First name')"
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
          name="email"
          rules="required|email"
          slim
        >
          <SfInput
            v-model="form.email"
            :label="$t('Your email address')"
            name="email"
            class="form__element email-input"
            required
            :valid="!errors[0]"
            :error-message="errors[0]"
          />
        </ValidationProvider>
      </form>

      <GreenCheckbox
        v-model="newsLetter"
        :value="newsLetter"
        :has-general-wrapper="false"
        :label="$t('Join newsletter')"
      />

      <span class="italic text-sm">{{ $t('By subscribing to the newsletter, you also accept Green Minds privacy policy') }}</span>
      <nuxt-link :to="{ name: 'gdpr' }" class="italic text-sm underline">
        {{ $t('read more') }}
      </nuxt-link>

      <!-- <p v-show="invalid" class="title">
        Enjoy these perks with your free account!
      </p>

      <CheckoutPerks />

      <div class="flex flex-wrap mb-5 items-baseline" style="height: 69px;">
        <GreenCheckbox
          v-show="invalid"
          v-model="wantRegister"
          :value="wantRegister"
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
      </div> -->
      <div class="submit-button mb-5">
        <GreenButton
          style-type="Primary"
          color="Green"
          shape="Round"
          :size="$device.isMobile ? 'Max' : 'Medium'"
          class="my-5"
          :disabled="invalid || loading"
          :loading="loading"
          @click="handleSubmit(handleFormSubmit)"
        >
          {{ $t("GO TO SHIPPING") }}
        </GreenButton>
      </div>
    </ValidationObserver>
  </div>
</template>

<script >
import { defineComponent, onMounted, ref, reactive, watch } from '@nuxtjs/composition-api';
import { SfButton, SfHeading, SfInput } from '@storefront-ui/vue';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import { useCart, useUser } from '@vue-storefront/odoo';
import { useUiState, useUiNotification, usePartner } from '~/composables';

export default defineComponent({
  name: 'Personaldetails',
  components: {
    SfHeading,
    SfInput,
    SfButton,
    ValidationProvider,
    ValidationObserver
  },
  emits: ['change'],
  setup(props, { root, emit }) {

    const { cart } = useCart();
    const { register, isAuthenticated } = useUser();
    const { toggleLoginModal } = useUiState();
    const { send } = useUiNotification();
    const { createUpdatePartner, error, loading } = usePartner();

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

    const loadUser = () => {
      if (cart.value?.order?.partner && !cart.value?.order?.partner?.name?.includes('Public')) {
        form.email = cart.value?.order?.partner.email;
        form.firstName = cart?.value?.order?.partner?.name?.split(' ')[0];
        form.lastName = cart?.value.order?.partner?.name?.split(' ')[1];
      }
    };

    const goToShipping = () => emit('change', 'shipping');

    const handleFormSubmit = async () => {
      // if (wantRegister.value) {
      await createUpdatePartner({ email: form.email, subscribeNewsletter: newsLetter.value, name: `${form.firstName} ${form.lastName}` });
      // } else {
      //
      // }

      if (error.value) {
        send({ message: error?.value?.message, type: 'danger' });
        return;
      }

      goToShipping();
    };

    watch(
      () => isAuthenticated.value,
      (value) => {
        if (value) goToShipping();
      }
    );

    watch(
      () => cart.value,
      () => loadUser(),
      { deep: true }
    );

    onMounted(async () => {
      loadUser();
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
