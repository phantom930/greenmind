<template>
  <form @submit.prevent="subscribe">
    <SfInput
      v-model="email"
      class="sf-input--outline sf-input--email"
      type="email"
      :placeholder="$t('Type your email')"
      @submit.prevent="subscribe"
    />
    <SfButton
      class="sf-button--email"
      :disabled="loading || !email"
      @click="subscribe"
    >
      {{ $t("SUBSCRIBE") }}
    </SfButton>
  </form>
</template>

<script>
import { SfInput, SfButton } from '@storefront-ui/vue';
import { useUiNotification } from '~/composables';
import { useNewsLetter } from '@vue-storefront/odoo';
import { ref } from '@nuxtjs/composition-api';
export default {
  components: {
    SfInput,
    SfButton
  },
  setup() {
    const { sendSubscription, loading } = useNewsLetter();
    const { send } = useUiNotification();

    const email = ref(null);

    const subscribe = async () => {
      const data = await sendSubscription({ email: email.value });
      if (data.subscribed) {
        send({
          message: 'Subscribe successfull!',
          type: 'success'
        });
      }
      if (!data.subscribed) {
        send({
          message: 'Something wrong!',
          type: 'danger'
        });
      }
    };

    return {
      loading,
      subscribe,
      email
    };
  }
};
</script>

<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: row-reverse;
  justify-self: right;
  height: 32px;
  margin-top: 22px;
  width: fit-content;
}

@media (max-width: 1024px) {
  form {
    position: relative;
    right: 96px;
  }
}

.sf-input--email {
  border-radius: 40px;
  width: 343px;
  min-height: auto;
  font-size: 16px;
  color: #43464e;
  background-color: #f1f2f3;
  --input-border: none;
  --input-bar-display: none;
}
.sf-button--email {
  border-radius: 40px;
  width: 116px;
  position: relative;
  left: 349px;
  transform: scale(0.8, 0.8);
  --button-background: #7ba393;
}
.sf-button--email:hover {
  --button-background: #78a886;
  --button-box-shadow-opacity: 0.25;
  --button-background: #78a886
    radial-gradient(circle, transparent 1%, #32463d 1%) center/15000%;
}
.sf-button--email:active {
  --button-box-shadow: none;
  --button-background: #32463d
    radial-gradient(circle, transparent 40%, #78a886 1%) center/15000%;
  --button-transition: background 0s;
  --button-text-decoration: none;
  background-size: 100%;
}
</style>
