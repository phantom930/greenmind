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
      <LoginModal />
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
import LoginModal from '~/components/LoginModal.vue';
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
    LoginModal,
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

#layout {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: auto;
  }
}

.no-scroll {
  overflow: hidden;
  height: 100vh;
}

// Reset CSS
html {
  width: auto;
  @include for-mobile {
    overflow-x: hidden;
  }
}
body {
  overflow-y: auto !important;
  overflow-x: hidden;
  color: var(--c-text);
  font-size: var(--font-size--base);
  font-family: var(--font-family--primary);
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
  color: var(--c-link);
  &:hover {
    color: var(--c-link-hover);
  }
}
h1 {
  font-family: var(--font-family--secondary);
  font-size: var(--h1-font-size);
  line-height: 1.6;
  margin: 0;
}
h2 {
  font-family: var(--font-family--secondary);
  font-size: var(--h2-font-size);
  line-height: 1.6;
  margin: 0;
}
h3 {
  font-family: var(--font-family--secondary);
  font-size: var(--h3-font-size);
  line-height: 1.6;
  margin: 0;
}
h4 {
  font-family: var(--font-family--secondary);
  font-size: var(--h4-font-size);
  line-height: 1.6;
  margin: 0;
}
</style>
