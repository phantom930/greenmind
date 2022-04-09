<template>
  <div>
    <LazyHydrate when-visible>
      <TopBar />
    </LazyHydrate>
    <LazyHydrate when-idle>
      <GreenHeader />
    </LazyHydrate>
    <GreenTopbarTertiary v-if="xlAndLarger" />
    <StoreStatus />
    <div id="">
      <nuxt :key="$route.fullPath" />

      <LazyHydrate when-visible>
        <BottomNavigation />
      </LazyHydrate>
      <CartSidebar />
      <HamburguerMenu />
      <WishlistSidebar />
      <Notification />
    </div>
    <LazyHydrate when-visible>
      <GreenFooter />
    </LazyHydrate>
  </div>
</template>

<script>
import BottomNavigation from '~/components/BottomNavigation.vue';
import TopBar from '~/components/TopBar.vue';
import CartSidebar from '~/components/CartSidebar.vue';
import HamburguerMenu from '~/components/HamburguerMenu.vue';
import WishlistSidebar from '~/components/WishlistSidebar.vue';
import LazyHydrate from 'vue-lazy-hydration';
import Notification from '~/components/Notification';
import StoreStatus from '~/components/Product/StoreStatus.vue';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

export default {
  name: 'DefaultLayout',
  components: {
    LazyHydrate,
    TopBar,
    BottomNavigation,
    CartSidebar,
    HamburguerMenu,
    WishlistSidebar,
    StoreStatus,
    Notification
  },
  setup () {
    const breakpoints = useBreakpoints(breakpointsTailwind);

    const xlAndLarger = breakpoints.greater('xl');
    return {
      xlAndLarger
    };
  }
};
</script>

<style lang="scss">
@import "~@storefront-ui/vue/styles";
@import "~/assets/styles.scss";
</style>
