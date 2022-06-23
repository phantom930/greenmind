<template>
  <div>
    <SfHeader
      class="sf-header--has-mobile-search"
    >
      <template #logo />
      <template #navigation>
        <div v-show="$device.isDesktop" class="lg:grid grid-cols-3 auto-cols-min header-links hidden">
          <SfHeaderNavigationItem
            v-for="(category, index) in sbCategories"
            :key="index"
            data-cy="app-header-top-categories"
            class="nav-item"
            :label="category.name"
            :title="category.name"
            :link="{ name: category.slug }"
          />
        </div>
        <div id="logo">
          <nuxt-link
            v-show="mobileOrTabletSize"
            title="GreenMind"
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
            v-show="!mobileOrTabletSize"
            title="GreenMind"
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
        </div>
      </template>
      <template #header-icons>
        <div class="flex justify-self-end	justify-end">
          <!-- temporary removed -->
          <!-- <SfButton
            class="sf-button--pure sf-header__action"
            @click="handleAccountClick"
          >
            <SfIcon :icon="accountIcon" size="1.25rem" />
          </SfButton> -->
          <SfSearchBar
            v-show="isSearchOpen && !mobileOrTabletSize"
            ref="searchBarRef"
            style="width: 290px;"
            :placeholder="$t('Search for items and promotions')"
            aria-label="Search"
            class="sf-header__search none"
            :value="term"
            :icon="{
              icon: isSearchOpen ? 'cross' : 'search',
              size: '1.25rem',
              color: '#43464E',
            }"
            @keydown.esc="closeSearch"
            @click:icon="closeOrFocusSearchBar"
          />

          <SfButton
            v-if="!isSearchOpen"
            class="sf-button--pure sf-header__action"
            @click.prevent="toggleSearchBar"
          >
            <SfIcon
              class="sf-header__icon"
              icon="search"
              size="1.25rem"
            />
          </SfButton>
          <SfButton
            class="sf-button--pure sf-header__action"
            @click="handleToggleCartSidebar"
          >
            <SfIcon
              class="sf-header__icon"
              icon="empty_cart"
              :color="isCartSidebarOpen ? '#78A886' : ''"
              size="1.40rem"
            />

            <SfBadge class="sf-badge--number cart-badge" :class="{ hidden: !cartTotalItems }">
              {{ cartTotalItems }}
            </SfBadge>
          </SfButton>
          <SfButton
            class="sf-button--pure sf-header__action list"
            @click="handleToggleHamburguerMenu"
          >
            <SfIcon
              class="sf-header__icon"
              icon="list"
              size="1.25rem"
              :color="isHamburguerMenuOpen ? '#78A886' : ''"
            />
          </SfButton>
        </div>
        <transition
          name="sf-fade"
          mode="out-in"
        >
          <div class="flex col-start-1 col-end-3">
            <SfSearchBar
              v-show="isSearchOpen && mobileOrTabletSize"
              ref="searchBarRef"
              :placeholder="$t('Search for items and promotions')"
              aria-label="Search"
              class="sf-header__search none"
              :value="term"
              :icon="{
                icon: isSearchOpen ? 'cross' : 'search',
                size: '1.25rem',
                color: '#43464E',
              }"
              @keydown.esc="closeSearch"
              @click:icon="closeOrFocusSearchBar"
            />
          </div>
        </transition>
      </template>

      <!-- End of Search bar -->
    </SfHeader>

    <GreenSearchClerk />

    <SfOverlay
      :visible="isSearchOpen"
      :class="{
        'top-32': isSearchOpen && !mobileOrTabletSize,
        'top-48': isSearchOpen && mobileOrTabletSize
      }"
    />
  </div>
</template>

<script>
import {
  SfImage,
  SfSearchBar,
  SfIcon,
  SfButton,
  SfOverlay,
  SfBadge,
  SfHeader
} from '@storefront-ui/vue';
import { useUiState } from '~/composables';
import { useCart, useUser, useFacet } from '@vue-storefront/odoo';
import { computed, ref, watch } from '@nuxtjs/composition-api';
import { onSSR } from '@vue-storefront/core';
import { useUiHelpers, cartGetters } from '~/composables';
export default {
  components: {
    SfHeader,
    SfImage,
    SfIcon,
    SfButton,
    SfSearchBar,
    SfOverlay,
    SfBadge
  },
  setup(props, { root }) {
    const searchBarRef = ref(null);
    const term = ref(null);
    const formatedResult = ref(null);

    const { changeSearchTerm } = useUiHelpers();
    const { isCartSidebarOpen, isSearchOpen, toggleSearch, isHamburguerMenuOpen, toggleCartSidebar, toggleLoginModal, toggleHamburguerMenu } =
      useUiState();

    const { load: loadUser, isAuthenticated } = useUser();
    const { load: loadCart, cart } = useCart();
    const { loading: searchLoading } = useFacet('AppHeader:Search');

    const cartTotalItems = computed(() => {
      const count = cartGetters.getTotalItems(cart.value);
      return count ? count.toString() : null;
    });
    const accountIcon = computed(() =>
      isAuthenticated.value ? 'profile_fill' : 'profile'
    );

    const removeSearchResults = () => {
      formatedResult.value = null;
    };

    const closeSearch = (e) => {
      toggleSearch();
      term.value = '';
    };

    const handleToggleCartSidebar = () => {
      if (isHamburguerMenuOpen.value) {
        toggleHamburguerMenu();
      }
      closeSearch();
      toggleCartSidebar();

    };

    const toggleSearchBar = () => {
      toggleSearch();
      searchBarRef.value?.$el?.children[0]?.children[0].focus();
    };

    const handleToggleHamburguerMenu = () => {
      closeSearch();
      toggleHamburguerMenu();
    };

    const mobileOrTabletSize = computed(() => root.$breakpoints.sMd);

    const closeOrFocusSearchBar = () => {
      term.value = '';
      closeSearch();
    };

    // TODO: https://github.com/DivanteLtd/vue-storefront/issues/4927
    const handleAccountClick = () => {
      if (isAuthenticated.value) {
        return root.$router.push('/Checkout');
      }

      toggleLoginModal();
    };

    watch(
      () => isSearchOpen.value,
      () => {
        const element = root.$el.querySelector('.sf-header__actions');
        if (mobileOrTabletSize.value) {
          element.style['grid-template-columns'] = isSearchOpen.value ? '1fr 1fr fit-content' : '2fr 1fr';
        }
        if (!mobileOrTabletSize.value) {
          element.style['grid-template-columns'] = '2fr 1fr';
        }
      }
    );

    onSSR(async () => {
      await Promise.all([
        loadUser(),
        loadCart({ customQuery: { cartLoad: 'greenCartLoad' } })
      ]);
    });

    return {
      toggleSearchBar,
      mobileOrTabletSize,
      isCartSidebarOpen,
      isHamburguerMenuOpen,
      handleToggleHamburguerMenu,
      handleToggleCartSidebar,
      isSearchOpen,
      toggleSearch,
      accountIcon,
      closeOrFocusSearchBar,
      cartTotalItems,
      removeSearchResults,
      searchBarRef,
      handleAccountClick,
      toggleCartSidebar,
      toggleHamburguerMenu,
      changeSearchTerm,
      formatedResult,
      term,
      closeSearch,
      searchLoading
    };
  },
  data() {
    return {
      startClerk: false,
      sbCategories: [
        // {
        //   name: 'SÆLG TIL OS',
        //   slug: 'sell-to-us'
        // },
        {
          name: 'REPARATION',
          slug: 'reparation'
        },
        {
          name: 'FIND BUTIK',
          slug: 'shops'
        }
      ]
    };
  },
  mounted () {
    setTimeout(() => {
      this.startClerk = true;
    }, 2000);
  }
};
</script>

<style lang='scss' scoped >
@import "~/assets/css/greenHeader.scss";
</style>
