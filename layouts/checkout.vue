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
import CartSidebar from '~/components/CartSidebar.vue';
import LazyHydrate from 'vue-lazy-hydration';
import Notification from '~/components/Notification';

export default {
  name: 'DefaultLayout',
  components: {
    LazyHydrate,
    CartSidebar,
    Notification
  }
};
</script>

<style lang="scss">
@import "~@storefront-ui/vue/styles";
@import "~/assets/styles.scss";
</style>
