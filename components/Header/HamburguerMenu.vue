<template>
  <div id="hamburguer">
    <SfSidebar
      :visible="isHamburguerMenuOpen"
      position="right"
      @close="toggleHamburguerMenu"
    >
      <template #bar>
        <div />
      </template>

      <div v-show="$device.isMobile">
        <LazyHydrate when-visible>
          <HeaderTopBar />
        </LazyHydrate>

        <LazyHydrate when-idle>
          <GreenHeader />
        </LazyHydrate>
      </div>
      <HeaderMegaMenu
        v-if="$device.isMobile"
        :is-visible="true"
        @bar-active="showBottomLinks = !arguments[0]"
      />

      <div
        v-show="showBottomLinks"
        class="p-4 mt-3"
        :class="{ 'mt-16' : $device.isDesktop }"
      >
        <nuxt-link :to="{ name: 'customer-service' }">
          <SfButton
            class="sf-button_hamburguer_item"
            @click="toggleHamburguerMenu"
          >
            <SfIcon
              class="sf-icon_hamburger_item"
              icon="marker"
              size="1.75rem"
            />
            {{ $t('Customer Service') }}
          </SfButton>
        </nuxt-link>
        <nuxt-link :to="{ name: 'how-to-sell' }">
          <SfButton
            class="sf-button_hamburguer_item"
            @click="toggleHamburguerMenu"
          >
            <SfIcon
              class="sf-icon_hamburger_item"
              icon="gift"
              size="1.75rem"
            />
            {{ $t('Sell to us') }}
          </SfButton>
        </nuxt-link>
        <nuxt-link :to="{ name: 'reparation' }">
          <SfButton
            class="sf-button_hamburguer_item"
            @click="toggleHamburguerMenu"
          >
            <SfIcon
              class="sf-icon_hamburger_item"
              icon="login"
              size="1.75rem"
            />
            {{ $t('Reparation') }}
          </SfButton>
        </nuxt-link>
        <nuxt-link :to="{ name: 'shops' }">
          <SfButton
            class="sf-button_hamburguer_item"
            @click="toggleHamburguerMenu"
          >
            <SfIcon
              class="sf-icon_hamburger_item"
              icon="marker"
              size="1.75rem"
            />
            {{ $t('Find store') }}
          </SfButton>
        </nuxt-link>
        <nuxt-link :to="{ name: 'about-us' }">
          <SfButton
            class="sf-button_hamburguer_item"
            @click="toggleHamburguerMenu"
          >
            <SfIcon
              class="sf-icon_hamburger_item"
              icon="gift"
              size="1.75rem"
            />
            {{ $t('About us') }}
          </SfButton>
        </nuxt-link>
      </div>
      <!--<nuxt-link :to="{ name: 'blog' }">
        <SfButton
          class="sf-button_hamburguer_item"
          @click="toggleHamburguerMenu"
        >
          <SfIcon
            class="sf-icon_hamburger_item"
            icon="login"
            size="1.75rem"
          />
          {{ $t('Blog') }}
        </SfButton>
      </nuxt-link>-->
      <!-- <SfDivider
        style="margin: 5% 0 5% 0;"
      /> -->
      <!--<SfButton
        class="sf-button_hamburguer_item"
        @click="loginHamburguer"
      >
        <SfIcon
          class="sf-icon_hamburger_item"
          icon="login"
          size="1.75rem"
        />
        {{ $t('Sign in') }}
      </SfButton>-->
    </SfSidebar>
  </div>
</template>
<script>
import { SfSidebar, SfButton, SfIcon, SfDivider } from '@storefront-ui/vue';
import { useUser } from '@vue-storefront/odoo';
import { ref } from '@nuxtjs/composition-api';
import { useUiState } from '~/composables';
import LazyHydrate from 'vue-lazy-hydration';

export default {
  name: 'Hamburgure',
  components: {
    SfSidebar,
    SfButton,
    SfIcon,
    SfDivider,
    LazyHydrate
  },
  setup() {
    const { isHamburguerMenuOpen, toggleHamburguerMenu, loginHamburguer } = useUiState();
    const { isAuthenticated } = useUser();
    const showBottomLinks = ref(true);

    return {
      showBottomLinks,
      isAuthenticated,
      isHamburguerMenuOpen,
      toggleHamburguerMenu,
      loginHamburguer
    };
  }
};
</script>

<style lang="scss" scoped>
@import '~/assets/css/hamburguer.scss';
</style>
