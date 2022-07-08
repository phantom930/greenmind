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

export default {
  name: 'DefaultLayout',
  components: {
    LazyHydrate,
    Notification
  },
  setup (props, context) {
    const { setCart } = useCart();

    onSSR(async () => {
      setCart(context.root.context.$vsf.$odoo.cart);
    });
  }
};
</script>

<style lang="scss">
@import "~/assets/styles.scss";
</style>
