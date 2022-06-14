<template>
  <div>
    <LazyHydrate when-visible>
      <HeaderTopBar />
    </LazyHydrate>

    <LazyHydrate when-idle>
      <GreenHeader />
    </LazyHydrate>
    <LazyHeaderTopbarTertiary class="hidden lg:block" />

    <!-- <LazyHydrate when-idle>
      <StoreStatus />
    </LazyHydrate> -->

    <nuxt :key="$route.fullPath" />

    <LazyHydrate when-idle>
      <CartSidebar />
    </LazyHydrate>
    <LazyHydrate when-idle>
      <LazyHeaderHamburguerMenu />
    </LazyHydrate>
    <!-- <WishlistSidebar /> -->
    <Notification />
    <LazyHydrate when-idle>
      <LoginModal />
    </LazyHydrate>
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
