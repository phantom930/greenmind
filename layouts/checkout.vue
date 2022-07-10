<template>
  <div>
    <LazyHydrate when-idle>
      <LazyCheckoutAppHeader class="mb-10" />
    </LazyHydrate>

    <nuxt :key="$route.fullPath" />

    <Notification />
    <LazyHydrate when-visible>
      <GreenFooter />
    </LazyHydrate>
  </div>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration';
import Notification from '~/components/Notification';
import { onSSR } from '@vue-storefront/core';
import { useCart } from '@vue-storefront/odoo';
import { useRouter, useStore } from '@nuxtjs/composition-api';

export default {
  name: 'DefaultLayout',
  components: {
    LazyHydrate,
    Notification
  },
  setup (props, context) {
    const router = useRouter();
    const store = useStore();
    const { setCart } = useCart();

    router.beforeResolve(async (to, from, next) => {
      const cart = JSON.parse(JSON.stringify(store.getters.getCheckoutCart));
      setCart(cart);
      next();
    });

    onSSR(async () => {
      setCart(context.root.context.$vsf.$odoo.cart);
    });

  }
};
</script>

<style lang="scss">
@import "~/assets/styles.scss";
</style>
