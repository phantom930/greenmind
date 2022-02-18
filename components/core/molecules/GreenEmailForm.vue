<template>
  <form @submit.prevent="subscribe">
    <div class="sf-div--email">
      <SfInput
        class="sf-input--outline sf-input--email"
        type="email"
        v-model="email"
        :placeholder="$t('Type your email')"
      />
      <SfButton class="sf-button--email">{{ $t("SUBSCRIBE") }}</SfButton>
    </div>
  </form>
</template> 

<script>
import { SfInput, SfButton } from "@storefront-ui/vue";
import { useUiNotification } from "~/composables";
import { useNewsLetter } from "@vue-storefront/odoo";
import { ref } from "@nuxtjs/composition-api";
export default {
  components: {
    SfInput,
    SfButton,
  },
  setup() {
    const { sendSubscription } = useNewsLetter();
    const { send } = useUiNotification();

    const email = ref(null);

    const subscribe = () => {
      const data = sendSubscription({ email: email.value });
      if (data.subscribed) {
        send({
          message: "Subscribe successfull!",
          type: "success",
        });
      }
      if (!data.subscribed) {
        send({
          message: "Something wrong!",
          type: "danger",
        });
      }
    };

    return {
      subscribe,
      email,
    };
  },
};
</script>

<style lang="scss" scoped>
.sf-div--email {
  display: flex;
  height: 32px;
  margin-top: 22px;
  width: fit-content;
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
  transform: translate(-95%) scale(0.8, 0.8);
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