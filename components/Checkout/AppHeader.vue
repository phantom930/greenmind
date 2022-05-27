<template>
  <div>
    <SfHeader class="sf-header--has-mobile-search">
      <template #logo />
      <template #search>
        <div />
      </template>
      <template #navigation>
        <div v-show="$device.isDesktop" class="">
          <nuxt-link class="flex" to="/">
            <SfIcon
              class="sf-header__icon mr-3"
              size="1.25rem"
              icon="chevron_left"
            />
            {{ $t('Go back to shop') }}
          </nuxt-link>
        </div>
        <nuxt-link
          v-if="$device.isMobile"
          :to="localePath('/')"
          class="sf-header__logo"
        >
          <SfImage
            :width="61"
            :height="35"
            src="/icons/GreenMind_logo_stacked_green_02.svg"
            alt="GreenMind"
            class="sf-header__logo-image"
          />
        </nuxt-link>
        <nuxt-link
          v-if="!$device.isMobile"
          :to="localePath('/')"
          class="sf-header__logo"
        >
          <SfImage
            :width="250"
            :height="35"
            src="/icons/GreenMind_logo_horizontal_green_02.svg"
            alt="GreenMind"
            class="sf-header__logo-image"
          />
        </nuxt-link>
      </template>
      <template #header-icons>
        <div class="sf-header__icons">
          <img
            :src="require('/assets/images/checkout/lock.svg')"
            alt="Lock"
          >
          <span class="secure-payment ml-5">{{ $t('Secure Payment') }}</span>
        </div>
      </template>
    </SfHeader>
  </div>
</template>

<script>
import { SfHeader, SfIcon, SfImage } from '@storefront-ui/vue';
import { onSSR } from '@vue-storefront/core';
import { useCart, useUser } from '@vue-storefront/odoo';
import { useUiState } from '~/composables';

export default {
  components: {
    SfHeader, SfImage, SfIcon
  },
  setup() {
    useUiState();

    const { load: loadUser } = useUser();
    const { load: loadCart } = useCart();

    onSSR(async () => {
      await Promise.all([
        loadUser(),
        loadCart({ customQuery: { cartLoad: 'greenCartLoad' } })
      ]);
    });

    return {
    };
  }
};
</script>

<style lang='scss' scoped >
@import "~/assets/css/greenHeader.scss";

.secure-payment {
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  align-self: center;
}
</style>
