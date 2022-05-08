<template>
  <SfModal
    :visible="isNewsletterModalOpen"
    @close="closeModal"
  >
    <template #modal-bar>
      <SfBar
        class="modal__title smartphone-only"
        :close="true"
        :title="$t('Subscribe to newsletter')"
        @click:close="closeModal"
      />
    </template>
    <transition
      name="sf-fade"
      mode="out-in"
      type="transition"
    >
      <div>
        <SfHeading
          :level="3"
          :title="$t('Subscribe to newsletter')"
          class="modal__title desktop-only"
        />
        <ValidationObserver
          v-slot="{ invalid }"
          key="log-in"
        >
          <form @submit.prevent="$emit('email-submitted', emailAddress)">
            <ValidationProvider
              v-slot="{ errors }"
              name="email"
              rules="required|email"
              slim
            >
              <SfInput
                v-model="emailAddress"
                type="email"
                name="email"
                :label="$t('Email address')"
                required
                :valid="!errors[0]"
                :error-message="errors[0]"
                class="form__element"
              />
            </ValidationProvider>

            <SfButton
              class="modal__button"
              type="submit"
              :disabled="loading || invalid"
            >
              {{ $t('I confirm subscription') }}
            </SfButton>
          </form>
        </ValidationObserver>

        <SfHeading
          :description="$t('You can unsubscribe at any time')"
          :level="3"
        />
      </div>
    </transition>
  </SfModal>
</template>
<script>
import {
  SfModal,
  SfHeading,
  SfInput,
  SfButton,
  SfBar
} from '@storefront-ui/vue';
import { ref } from '@nuxtjs/composition-api';
import { useUiState } from '~/composables';
import { ValidationProvider, ValidationObserver } from 'vee-validate';

export default {
  name: 'NewsletterModal',
  components: {
    ValidationProvider,
    ValidationObserver,
    SfModal,
    SfHeading,
    SfInput,
    SfButton,
    SfBar
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['email-submitted'],
  setup() {
    const { isNewsletterModalOpen, toggleNewsletterModal } = useUiState();

    const isHidden = ref(true);
    const emailAddress = ref('');

    const closeModal = () => {
      toggleNewsletterModal();
    };

    return {
      isNewsletterModalOpen,
      toggleNewsletterModal,
      isHidden,
      emailAddress,
      closeModal
    };
  }
};
</script>

<style lang="scss" scoped>
.modal {
  display: flex;
  justify-content: center;
  --modal-index: 3;
  --overlay-z-index: 3;
  --modal-content-padding: var(--spacer-xl);
  &__input,
  &__button {
    margin: 0 auto;
  }
  &__content {
    font-size: var(--font-size--sm);
    font-weight: var(--font-weight--light);
  }
  .sf-scrollable__view-all.sf-button {
    font-weight: var(--font-weight--light);
  }
}
::v-deep .sf-input__label {
  --input-font-size: var(--font-size--base);
  --input-label-font-size: var(--font-size--base);
      font-family: var(--font-family--primary);

}
</style>
