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
import { onMounted } from '@nuxtjs/composition-api';

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

    onMounted(() => {
      setCart(null);
      const { data } = await context.root.context.$vsf.$odoo.api.cartLoadWithUpdate({ updatePrices: true });
      setCart(data.cart);
    });
  }
};
</script>

<style lang="scss">
@import "~/assets/styles.scss";
</style>
