<template>
  <div>
    <LazyHydrate when-visible>
      <TopBar class="desktop-only" />
    </LazyHydrate>
    <LazyHydrate when-idle>
      <GreenHeader />
    </LazyHydrate>
    <!-- <GreenTopbarTertiary /> -->

    <div id="">
      <nuxt :key="$route.fullPath" />

      <LazyHydrate when-visible>
        <BottomNavigation />
      </LazyHydrate>
      <CartSidebar />
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
import WishlistSidebar from '~/components/WishlistSidebar.vue';
import LoginModal from '~/components/LoginModal.vue';
import LazyHydrate from 'vue-lazy-hydration';
import Notification from '~/components/Notification';

export default {
  name: 'DefaultLayout',
  components: {
    LazyHydrate,
    TopBar,
    BottomNavigation,
    CartSidebar,
    WishlistSidebar,
    LoginModal,
    Notification
  },
  setup () {

  }
};
</script>

<style lang="scss">
@import "~@storefront-ui/vue/styles";

.no-scroll {
  overflow: hidden;
  height: 100vh;
}
</style>
