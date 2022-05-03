<template>
  <div id="hamburguer">
    <SfSidebar
      :visible="isHamburguerMenuOpen"
      right
      class="sf-sidebar--right"
      @close="toggleHamburguerMenu"
    >
      <nuxt-link to="/customer-service">
        <SfButton
          style="margin-top: 15%;"
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
      <nuxt-link to="/sell-to-us">
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
      <nuxt-link to="/reparation">
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
      <nuxt-link to="/shops">
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
      <nuxt-link to="/about-us">
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
      <!--<nuxt-link to="/blog">
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
      <SfDivider
        style="margin: 5% 0 5% 0;"
      />
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
import {
  SfSidebar,
  SfButton,
  SfIcon,
  SfDivider
} from '@storefront-ui/vue';
import { useUser } from '@vue-storefront/odoo';
import { useUiState } from '~/composables';

export default {
  name: 'Hamburgure',
  components: {
    SfSidebar,
    SfButton,
    SfIcon,
    SfDivider
  },
  setup() {
    const { isHamburguerMenuOpen, toggleHamburguerMenu, loginHamburguer } = useUiState();
    const { isAuthenticated } = useUser();

    return {
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
